package com.musinsa.trend.track.mutrent.crawler.dto;

public record CrawlerResponse(
        boolean success,
        String message,
        int savedCount
) {}