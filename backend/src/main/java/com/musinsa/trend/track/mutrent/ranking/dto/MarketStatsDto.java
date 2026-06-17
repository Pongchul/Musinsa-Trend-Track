package com.musinsa.trend.track.mutrent.ranking.dto;

public record MarketStatsDto(
        TopCategoryDto topCategory,
        BiggestMoverDto biggestMover,
        int totalVolume
) {}