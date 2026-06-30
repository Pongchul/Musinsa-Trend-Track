import os
from dotenv import load_dotenv

load_dotenv()  # .env 파일을 읽어 os.environ에 채워 넣음

SPRING_API_URL = os.getenv("SPRING_API_URL")
if not SPRING_API_URL:
    raise RuntimeError("SPRING_API_URL 환경변수가 설정되지 않았습니다.")

TARGET_COUNT = int(os.getenv("CRAWLER_TARGET_COUNT", "100"))
MAX_SCROLL = int(os.getenv("CRAWLER_MAX_SCROLL", "40"))
NO_NEW_ITEM_SCROLL_LIMIT = int(os.getenv("CRAWLER_NO_NEW_ITEM_LIMIT", "3"))

SEND_RETRY_COUNT = int(os.getenv("CRAWLER_SEND_RETRY_COUNT", "3"))
SEND_RETRY_BACKOFF_SEC = float(os.getenv("CRAWLER_SEND_RETRY_BACKOFF_SEC", "2"))

CATEGORY_TIMEOUT_SEC = int(os.getenv("CRAWLER_CATEGORY_TIMEOUT_SEC", "120"))

CATEGORY_URLS = {
    "ALL":       "https://www.musinsa.com/main/musinsa/ranking?gf=A&storeCode=musinsa&sectionId=200&categoryCode=000&subPan=product&contentsId=&ageBand=AGE_BAND_ALL",
    "TOP":       "https://www.musinsa.com/main/musinsa/ranking?gf=A&storeCode=musinsa&sectionId=200&categoryCode=001001&subPan=product&contentsId=&ageBand=AGE_BAND_ALL",
    "OUTER":     "https://www.musinsa.com/main/musinsa/ranking?gf=A&storeCode=musinsa&sectionId=200&categoryCode=002000&subPan=product&contentsId=&ageBand=AGE_BAND_ALL",
    "PANTS":     "https://www.musinsa.com/main/musinsa/ranking?gf=A&storeCode=musinsa&sectionId=200&categoryCode=003000&subPan=product&contentsId=&ageBand=AGE_BAND_ALL",
    "ACCESSORY": "https://www.musinsa.com/main/musinsa/ranking?gf=A&storeCode=musinsa&sectionId=200&categoryCode=101000&subPan=product&contentsId=&ageBand=AGE_BAND_ALL",
}