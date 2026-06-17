package com.musinsa.trend.track.mutrent.ranking.dto;

import java.time.LocalDateTime;

public record ProductRankingDto(
        Long productId,
        String productName,
        String brandName,
        String imageUrl,
        String category,
        Integer rank,
        Integer rankChange,
        Integer priceNumeric,
        LocalDateTime snapshotDate
) {}