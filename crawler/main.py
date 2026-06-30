import logging

from fastapi import FastAPI

from api.crawler import router as crawler_router

logging.basicConfig(level=logging.INFO)

app = FastAPI(title="Musinsa Crawler")

app.include_router(crawler_router)
