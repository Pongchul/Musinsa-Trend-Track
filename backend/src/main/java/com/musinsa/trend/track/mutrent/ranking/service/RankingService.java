package com.musinsa.trend.track.mutrent.ranking.service;

import com.musinsa.trend.track.mutrent.product.domain.CategoryType;
import com.musinsa.trend.track.mutrent.product.domain.Product;
import com.musinsa.trend.track.mutrent.ranking.domain.RankingSnapshot;
import com.musinsa.trend.track.mutrent.ranking.dto.*;
import com.musinsa.trend.track.mutrent.ranking.repository.RankingSnapshotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RankingService {

    private final RankingSnapshotRepository rankingSnapshotRepository;

    private List<RankingSnapshot> fetchLatestSnapshots(String category) {
        if (category == null || category.equalsIgnoreCase("ALL")) {
            return rankingSnapshotRepository.findAllLatest();
        }

        CategoryType categoryType = CategoryType.valueOf(category);
        LocalDateTime latest = rankingSnapshotRepository
                .findLastestSnapshotDateByCategory(categoryType)
                .orElseThrow(() -> new RuntimeException("No snapshot for category: " + category));

        return rankingSnapshotRepository.findLastestByCategory(categoryType, latest);
    }

    public Page<ProductRankingDto> getRisingProducts(String category, Pageable pageable) {
        List<ProductRankingDto> result = fetchLatestSnapshots(category).stream()
                .filter(r -> r.getRankChange() != null && r.getRankChange() > 0)
                .sorted(Comparator.comparingInt(r -> -r.getRankChange()))
                .map(this::toDto)
                .toList();

        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), result.size());
        return new PageImpl<>(result.subList(start, end), pageable, result.size());
    }

    public Page<ProductRankingDto> getCoolingProducts(String category, Pageable pageable) {
        List<ProductRankingDto> result = fetchLatestSnapshots(category).stream()
                .filter(r -> r.getRankChange() != null && r.getRankChange() < 0)
                .sorted(Comparator.comparingInt(RankingSnapshot::getRankChange))
                .map(this::toDto)
                .toList();

        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), result.size());

        return new PageImpl<>(
                result.subList(start, end),
                pageable,
                result.size()
        );
    }

    public MarketStatsDto getMarketStats() {
        List<RankingSnapshot> all = rankingSnapshotRepository.findAllLatest();

        // Top Category: 카테고리별 평균 rankChange가 가장 높은 것
        Map.Entry<String, Double> topCategory = all.stream()
                .filter(r -> r.getRankChange() != null)
                .collect(Collectors.groupingBy(
                        r -> r.getProduct().getCategory().name(),
                        Collectors.averagingInt(RankingSnapshot::getRankChange)
                ))
                .entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .orElseThrow();

        // Biggest Mover: rankChange 가장 큰 단일 상품
        RankingSnapshot biggestMover = all.stream()
                .filter(r -> r.getRankChange() != null)
                .max(Comparator.comparingInt(RankingSnapshot::getRankChange))
                .orElseThrow();

        return new MarketStatsDto(
                new TopCategoryDto(topCategory.getKey(), topCategory.getValue()),
                new BiggestMoverDto(
                        biggestMover.getProduct().getProductName(),
                        biggestMover.getRank(),
                        biggestMover.getRankChange()
                ),
                all.size()
        );
    }

//    public Page<LatestRankingDto> getLatestRankingProducts(Pageable pageable, CategoryType category) {
//
//    }

    private ProductRankingDto toDto(RankingSnapshot r) {
        Product p = r.getProduct();
        return new ProductRankingDto(
                p.getId(),
                p.getProductName(),
                p.getBrandName(),
                p.getImageUrl(),
                p.getCategory().name(),
                r.getRank(),
                r.getRankChange(),
                r.getPriceNumeric(),
                r.getSnapshotDate()
        );
    }
}
