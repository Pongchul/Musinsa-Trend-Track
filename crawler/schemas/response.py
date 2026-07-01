from pydantic import BaseModel


class CrawlerResponse(BaseModel):
    """크롤링 시작 요청에 대한 즉시 응답 (결과는 아직 모름)"""
    success: bool
    message: str
    savedCount: int


class RankingItem(BaseModel):
    """Spring RankingItemDto와 동일한 구조"""
    rank: int
    productId: str
    brand: str
    price: str | None = None
    discountRate: str | None = None
    name: str
    link: str
    img: str | None = None
    category: str


class SpringPayload(BaseModel):
    """Spring CrawledDataRequest와 동일한 구조"""
    category: str
    rankings: list[RankingItem]


class CrawlResult(BaseModel):
    """크롤링 전체 작업 결과 (상태 폴링용)"""
    success: bool
    total: int
    succeeded_categories: list[str]
    failed_categories: list[str]