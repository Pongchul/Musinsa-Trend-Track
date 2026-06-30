from typing import Literal

from pydantic import BaseModel

CategoryName = Literal["ALL", "TOP", "OUTER", "PANTS", "ACCESSORY"]


class CrawlTriggerRequest(BaseModel):
    """Spring Batch에서 받는 크롤링 시작 요청"""
    categories: list[CategoryName] = ["TOP"]