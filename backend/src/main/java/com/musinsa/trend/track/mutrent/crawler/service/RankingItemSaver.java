package com.musinsa.trend.track.mutrent.crawler.service;

import com.musinsa.trend.track.mutrent.crawler.dto.RankingItemDto;
import com.musinsa.trend.track.mutrent.product.domain.CategoryType;
import com.musinsa.trend.track.mutrent.product.domain.Product;
import com.musinsa.trend.track.mutrent.product.service.ProductService;
import com.musinsa.trend.track.mutrent.ranking.domain.RankingSnapshot;
import com.musinsa.trend.track.mutrent.ranking.repository.RankingSnapshotRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class RankingItemSaver {

    private final ProductService productService;
    private final RankingSnapshotRepository rankingSnapshotRepository;

    /**
     * 상품 하나를 독립 트랜잭션으로 저장
     * - 실패해도 다른 상품에 영향 없음
     * - 호출부(RankingCrawlerService)와 반드시 별도 Bean이어야 @Transactional 적용됨
     */
    @Transactional
    public void saveOne(RankingItemDto item, CategoryType category, LocalDateTime snapshotDate) {
        // 1. Product 조회 또는 생성
        Product product = productService.findOrCreateProduct(item);

        // 2. 이전 스냅샷 조회 (변동 계산용)
        Optional<RankingSnapshot> previousSnapshot =
                rankingSnapshotRepository.findTopByProductAndProduct_CategoryOrderBySnapshotDateDesc(
                        product, category
                );

        // 3. 가격 파싱
        Integer priceNumeric = parse(item.price());
        Integer discountRateNumeric = parse(item.discountRate());

        // 4. 랭킹 변동 계산
        Integer previousRank = previousSnapshot.map(RankingSnapshot::getRank).orElse(null);
        Integer rankChange = calculateRankChange(item.rank(), previousRank);

        // 5. 가격 변동 계산
        Integer previousPrice = previousSnapshot.map(RankingSnapshot::getPriceNumeric).orElse(null);
        Integer priceChange = calculatePriceChange(priceNumeric, previousPrice);

        // 6. RankingSnapshot 저장
        RankingSnapshot snapshot = RankingSnapshot.builder()
                .product(product)
                .rank(item.rank())
                .snapshotDate(snapshotDate)
                .price(item.price())
                .priceNumeric(priceNumeric)
                .discountRate(item.discountRate())
                .discountRateNumeric(discountRateNumeric)
                .previousRank(previousRank)
                .rankChange(rankChange)
                .previousPrice(previousPrice)
                .priceChange(priceChange)
                .build();

        rankingSnapshotRepository.save(snapshot);

        log.debug("저장 완료: rank={}, productId={}, rankChange={}",
                item.rank(), item.productId(), rankChange);
    }

    private Integer parse(String value) {
        if (value == null || value.isBlank()) return null;
        try {
            return Integer.parseInt(value.replaceAll("[^0-9]", ""));
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private Integer calculateRankChange(int currentRank, Integer previousRank) {
        if (previousRank == null) return null;
        return previousRank - currentRank; // 양수 = 상승, 음수 = 하락
    }

    private Integer calculatePriceChange(Integer currentPrice, Integer previousPrice) {
        if (currentPrice == null || previousPrice == null) return null;
        return currentPrice - previousPrice; // 양수 = 가격 상승, 음수 = 가격 하락
    }
}