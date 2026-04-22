package com.musinsa.trend.track.mutrent.crawler.dto;

public record RankingItemDto(
        Integer rank,
        String productId,
        String brand,
        String price,
        String discountRate,
        String name,
        String link,
        String img
) {}