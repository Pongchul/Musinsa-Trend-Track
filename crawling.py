# import requests
# import json
# from playwright.sync_api import sync_playwright
# import time
# import re
#
# URL = (
#     "https://www.musinsa.com/main/musinsa/ranking"
#     "?gf=A&storeCode=musinsa&sectionId=200"
#     "&categoryCode=001000&subPan=product"
# )
#
# TARGET_COUNT = 100
# MAX_SCROLL = 40   # 무한 루프 방지
#
# def clean_product_name(name: str, brand: str) -> str:
#     if not name:
#         return name
#
#     # 1. "상품 이미지" 제거
#     name = name.replace("상품 이미지", "").strip()
#
#     # 2. 브랜드명 앞에서 제거 (data-item-brand 활용)
#     if brand and name.startswith(brand):
#         name = name[len(brand):].strip()
#
#     return name
#
# with sync_playwright() as p:
#     browser = p.chromium.launch(headless=False)
#     page = browser.new_page()
#
#     print("[LOG] 페이지 이동")
#     page.goto(URL, timeout=60000)
#
#     # 랭킹 아이템 로딩 대기
#     page.wait_for_selector(
#         'a[data-item-list-id="ranking_goods_list"]',
#         timeout=60000
#     )
#
#     print("[LOG] 랭킹 페이지 로딩 완료")
#
#     seen_product_ids = set()
#     results = []
#
#     scroll_count = 0
#
#     while len(results) < TARGET_COUNT and scroll_count < MAX_SCROLL:
#         print(f"[LOG] 스크롤 {scroll_count}회 / 현재 수집 {len(results)}개")
#
#         items = page.query_selector_all(
#             'a[data-item-list-id="ranking_goods_list"][data-item-list-index]'
#         )
#
#         for item in items:
#             product_id = item.get_attribute("data-item-id")
#             if not product_id or product_id in seen_product_ids:
#                 continue
#
#             rank = int(item.get_attribute("data-item-list-index"))
#
#             # 1~100위만 수집
#             if rank > TARGET_COUNT:
#                 continue
#
#             seen_product_ids.add(product_id)
#
#             brand = item.get_attribute("data-item-brand")
#             price = item.get_attribute("data-price")
#             discount_rate = item.get_attribute("data-discount-rate")
#
#             img_el = item.query_selector("img")
#             img = img_el.get_attribute("src") if img_el else None
#             name_raw = img_el.get_attribute("alt") if img_el else None
#             name = clean_product_name(name_raw, brand)
#
#             results.append({
#                 "rank": rank,
#                 "productId": product_id,
#                 "brand": brand,
#                 "price": price,
#                 "discountRate": discount_rate,
#                 "name": name,
#                 "link": f"https://www.musinsa.com/products/{product_id}",
#                 "img": img,
#                 "category": "TOP"
#             })
#
#         # 🔽 다음 랭킹 영역 로딩
#         page.mouse.wheel(0, 1500)
#         time.sleep(0.7)
#
#         scroll_count += 1
#
#     # 🔥 랭킹 기준 정렬
#     results.sort(key=lambda x: x["rank"])
#
#     print("\n[LOG] 최종 크롤링 결과")
#     print(f"[LOG] 총 상품 수: {len(results)}")
#
#     for r in results:
#         print(f"""
#             [{r['rank']}위]
#             상품 ID: {r['productId']}
#             브랜드: {r['brand']}
#             가격: {r['price']}
#             할인율: {r['discountRate']}
#             상품명: {r['name']}
#             링크: {r['link']}
#             이미지: {r['img']}
#             """)
#
#     # ✅ 누락 검증
#     ranks = [r["rank"] for r in results]
#     missing = set(range(1, TARGET_COUNT + 1)) - set(ranks)
#     if missing:
#         print(f"[WARN] 누락된 랭킹: {sorted(missing)}")
#     else:
#         print("[SUCCESS] 1~100위 모두 수집 완료 🎉")
#
#     browser.close()
#
# if results:
#     payload = {
#         "category": "TOP",
#         "rankings": results
#     }
#
#     try:
#         response = requests.post(
#             "http://localhost:8080/api/crawler/rankings",
#             json=payload,
#             headers={"Content-Type": "application/json"},
#             timeout=30
#         )
#
#         if response.status_code == 200:
#             print("[SUCCESS] 서버 전송 완료 ✅")
#         else:
#             print(f"[ERROR] 서버 응답 오류: {response.status_code}")
#             print(response.text)
#
#     except requests.exceptions.RequestException as e:
#         print(f"[ERROR] 서버 전송 실패: {e}")
#         # 실패 시 로컬 파일로 백업
#         with open(f"backup_{int(time.time())}.json", "w") as f:
#             json.dump(payload, f, ensure_ascii=False, indent=2)
#
#
