import asyncio
import logging

from playwright.async_api import Page, async_playwright

from config import (
    CATEGORY_TIMEOUT_SEC,
    CATEGORY_URLS,
    MAX_SCROLL,
    NO_NEW_ITEM_SCROLL_LIMIT,
    TARGET_COUNT,
)
from schemas.response import CrawlResult, RankingItem
from services.spring_client import send_to_spring
from state import crawl_status

logger = logging.getLogger(__name__)


def clean_product_name(name: str | None, brand: str) -> str:
    if not name:
        return name or ""
    name = name.replace("상품 이미지", "").strip()
    if brand and name.startswith(brand):
        name = name[len(brand):].strip()
    return name


async def crawl_category(page: Page, category: str, url: str) -> list[RankingItem]:
    logger.info(f"[CRAWL] {category} 카테고리 시작")
    await page.goto(url, timeout=60000)
    await page.wait_for_selector(
        'a[data-item-list-id="ranking_goods_list"]',
        timeout=60000,
    )

    seen_ids: set[str] = set()
    results: list[RankingItem] = []
    scroll_count = 0
    no_new_item_streak = 0

    while len(results) < TARGET_COUNT and scroll_count < MAX_SCROLL:
        items = await page.query_selector_all(
            'a[data-item-list-id="ranking_goods_list"][data-item-list-index]'
        )

        found_new = False

        for item in items:
            try:
                product_id = await item.get_attribute("data-item-id")
                if not product_id or product_id in seen_ids:
                    continue

                rank_attr = await item.get_attribute("data-item-list-index")
                if rank_attr is None:
                    continue
                rank = int(rank_attr)
                if rank > TARGET_COUNT:
                    continue

                seen_ids.add(product_id)
                found_new = True

                brand = await item.get_attribute("data-item-brand") or ""
                price = await item.get_attribute("data-price")
                discount_rate = await item.get_attribute("data-discount-rate")

                img_el = await item.query_selector("img")
                img = await img_el.get_attribute("src") if img_el else None
                name_raw = await img_el.get_attribute("alt") if img_el else None
                name = clean_product_name(name_raw, brand)

                results.append(RankingItem(
                    rank=rank,
                    productId=product_id,
                    brand=brand,
                    price=price,
                    discountRate=discount_rate,
                    name=name,
                    link=f"https://www.musinsa.com/products/{product_id}",
                    img=img,
                    category=category,
                ))
            except (AttributeError, ValueError, TypeError) as e:
                # 개별 아이템 파싱 실패는 건너뛰고 계속 진행 (DOM 구조 변경 가능성 로깅)
                logger.warning(f"[CRAWL] {category} 아이템 파싱 실패, 건너뜀: {e}")
                continue

        if found_new:
            no_new_item_streak = 0
        else:
            no_new_item_streak += 1
            # 연속으로 새 아이템이 안 잡히면 더 스크롤해도 의미 없다고 보고 조기 종료
            if no_new_item_streak >= NO_NEW_ITEM_SCROLL_LIMIT:
                logger.info(
                    f"[CRAWL] {category} 신규 아이템 {NO_NEW_ITEM_SCROLL_LIMIT}회 연속 없음, 조기 종료"
                )
                break

        await page.mouse.wheel(0, 1500)
        await asyncio.sleep(0.7)
        scroll_count += 1

    results.sort(key=lambda x: x.rank)
    logger.info(f"[CRAWL] {category} 완료 - {len(results)}개 수집")
    return results


async def run_crawl(categories: list[str]) -> None:
    total = 0
    succeeded_categories: list[str] = []
    failed_categories: list[str] = []

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)

            for category in categories:
                url = CATEGORY_URLS.get(category)
                if not url:
                    logger.warning(f"[WARN] 알 수 없는 카테고리: {category}")
                    failed_categories.append(category)
                    continue

                # 카테고리마다 새 페이지를 열어 이전 상태(쿠키, DOM 잔재)가 새지 않게 한다
                page = await browser.new_page()
                try:
                    items = await asyncio.wait_for(
                        crawl_category(page, category, url),
                        timeout=CATEGORY_TIMEOUT_SEC,
                    )
                    sent_ok = await send_to_spring(category, items)
                    if sent_ok:
                        succeeded_categories.append(category)
                        total += len(items)
                    else:
                        failed_categories.append(category)
                except asyncio.TimeoutError:
                    logger.error(f"[ERROR] {category} 크롤링 타임아웃 ({CATEGORY_TIMEOUT_SEC}s 초과)")
                    failed_categories.append(category)
                except Exception as e:
                    # 카테고리 단위 크롤링/전송 실패는 격리해서 다음 카테고리로 계속 진행
                    logger.error(f"[ERROR] {category} 크롤링 실패: {e}")
                    failed_categories.append(category)
                finally:
                    await page.close()

            await browser.close()

        result = CrawlResult(
            success=len(failed_categories) == 0,
            total=total,
            succeeded_categories=succeeded_categories,
            failed_categories=failed_categories,
        )
        logger.info(
            f"[DONE] 전체 크롤링 완료 - 성공 {len(succeeded_categories)}개, "
            f"실패 {len(failed_categories)}개, 총 {total}개 저장 요청"
        )

    except Exception as e:
        logger.error(f"[ERROR] 크롤링 전체 실패: {e}")
        result = CrawlResult(
            success=False,
            total=total,
            succeeded_categories=succeeded_categories,
            failed_categories=failed_categories or list(categories),
        )

    await crawl_status.finish(result)