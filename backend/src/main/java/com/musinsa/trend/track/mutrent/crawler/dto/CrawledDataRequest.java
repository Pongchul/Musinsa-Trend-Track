package com.musinsa.trend.track.mutrent.crawler.dto;

import com.musinsa.trend.track.mutrent.product.domain.CategoryType;

import java.util.List;

public record CrawledDataRequest(
        CategoryType category,
        List<RankingItemDto> rankings
) {}
