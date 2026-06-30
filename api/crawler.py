from fastapi import APIRouter, BackgroundTasks, HTTPException

from schemas.request import CrawlTriggerRequest
from schemas.response import CrawlerTriggerResponse
from services.crawler_service import run_crawl
from state import crawl_status


router = APIRouter()


@router.post("/crawl", response_model=CrawlerTriggerResponse)
async def trigger_crawl(request: CrawlTriggerRequest, background_tasks: BackgroundTasks):
    started = await crawl_status.try_start()
    if not started:
        raise HTTPException(status_code=409, detail="이미 크롤링이 진행 중입니다.")

    background_tasks.add_task(run_crawl, request.categories)
    return CrawlerTriggerResponse(success=True, message="크롤링 시작됨")


@router.get("/status")
async def get_status():
    return crawl_status.snapshot()


@router.get("/health")
async def health_check():
    return {"status": "ok"}