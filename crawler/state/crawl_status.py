import asyncio
import time

from schemas.response import CrawlResult

# 동시 실행 방지용 락. is_running 체크와 상태 변경 사이의 race condition을
# 막기 위해 모든 상태 변경은 이 락을 통해서만 이루어진다.
_lock = asyncio.Lock()

_status = {
    "is_running": False,
    "last_run": None,
    "last_result": None,
}


def snapshot() -> dict:
    """현재 상태를 읽기 전용으로 반환 (라우터의 /status 응답용)"""
    return dict(_status)


async def try_start() -> bool:
    """
    아직 실행 중이 아니면 is_running=True로 설정하고 True를 반환.
    이미 실행 중이면 상태를 바꾸지 않고 False를 반환.
    체크와 설정을 락 안에서 원자적으로 처리해 동시 요청에 의한 중복 실행을 막는다.
    """
    async with _lock:
        if _status["is_running"]:
            return False
        _status["is_running"] = True
        return True


async def finish(result: CrawlResult) -> None:
    async with _lock:
        _status["is_running"] = False
        _status["last_run"] = time.strftime("%Y-%m-%d %H:%M:%S")
        _status["last_result"] = result.model_dump()