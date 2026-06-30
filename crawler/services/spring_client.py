import asyncio
import logging

import httpx

from config import SEND_RETRY_BACKOFF_SEC, SEND_RETRY_COUNT, SPRING_API_URL
from schemas.response import RankingItem, SpringPayload

logger = logging.getLogger(__name__)


async def send_to_spring(category: str, items: list[RankingItem]) -> bool:
    """
    Spring /api/crawler/rankings 로 전송. 일시적 실패에 대비해 재시도한다.
    반환값은 최종 성공 여부.
    """
    payload = SpringPayload(category=category, rankings=items)
    body = payload.model_dump_json()

    for attempt in range(1, SEND_RETRY_COUNT + 1):
        try:
            async with httpx.AsyncClient(timeout=60) as client:
                resp = await client.post(
                    SPRING_API_URL,
                    content=body,
                    headers={"Content-Type": "application/json"},
                )

            if resp.status_code == 200:
                logger.info(f"[SEND] {category} → Spring 전송 완료 (시도 {attempt}/{SEND_RETRY_COUNT})")
                return True

            logger.error(
                f"[SEND] {category} 전송 실패 (시도 {attempt}/{SEND_RETRY_COUNT}): "
                f"{resp.status_code} {resp.text}"
            )

        except httpx.HTTPError as e:
            logger.error(f"[SEND] {category} 전송 예외 (시도 {attempt}/{SEND_RETRY_COUNT}): {e}")

        if attempt < SEND_RETRY_COUNT:
            await asyncio.sleep(SEND_RETRY_BACKOFF_SEC * attempt)

    logger.error(f"[SEND] {category} 최종 전송 실패 - {SEND_RETRY_COUNT}회 재시도 모두 실패, 데이터 유실")
    return False