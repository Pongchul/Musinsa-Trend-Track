package com.musinsa.trend.track.mutrent.crawler.dto;

import java.util.List;

public record CrawledDataRequest(
        String category,
        List<RankingItemDto> rankings
) {}
