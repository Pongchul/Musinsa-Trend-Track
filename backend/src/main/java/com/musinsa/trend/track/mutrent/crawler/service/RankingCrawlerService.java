package com.musinsa.trend.track.mutrent.crawler.service;

import com.musinsa.trend.track.mutrent.crawler.dto.CrawledDataRequest;
import com.musinsa.trend.track.mutrent.crawler.dto.RankingItemDto;
import com.musinsa.trend.track.mutrent.product.domain.Product;
import com.musinsa.trend.track.mutrent.product.repository.ProductRepository;
import com.musinsa.trend.track.mutrent.ranking.entity.RankingSnapshot;
import com.musinsa.trend.track.mutrent.ranking.repository.RankingSnapshotRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RankingCrawlerService {

    private final ProductRepository productRepository;
    private final RankingSnapshotRepository rankingSnapshotRepository;

    @Transactional
    public int saveRankingData(CrawledDataRequest request) {
        String category = request.category();
        LocalDateTime snapshotDate = LocalDateTime.now()
                .truncatedTo(ChronoUnit.HOURS); // 시간 단위로 정규화 (예: 15:23 → 15:00)

        log.info("랭킹 데이터 저장 시작: category={}, snapshotDate={}",
                category, snapshotDate);

        int savedCount = 0;

        for (RankingItemDto item : request.rankings()) {
            try {
                // 1️⃣ Product 조회 또는 생성
                Product product = findOrCreateProduct(item);

                // 2️⃣ 이전 스냅샷 조회 (변동 계산용)
                Optional<RankingSnapshot> previousSnapshot =
                        rankingSnapshotRepository.findTopByProductAndCategoryOrderBySnapshotDateDesc(
                                product, category
                        );

                // 3️⃣ 가격 파싱
                Integer priceNumeric = parse(item.price());
                Integer discountRateNumeric = parse(item.discountRate());

                // 4️⃣ 랭킹 변동 계산
                Integer previousRank = previousSnapshot.map(RankingSnapshot::getRank).orElse(null);
                Integer rankChange = calculateRankChange(item.rank(), previousRank);

                // 5️⃣ 가격 변동 계산
                Integer previousPrice = previousSnapshot.map(RankingSnapshot::getPriceNumeric).orElse(null);
                Integer priceChange = calculatePriceChange(priceNumeric, previousPrice);

                // 6️⃣ RankingSnapshot 저장
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
                savedCount++;

                log.debug("저장 완료: rank={}, productId={}, rankChange={}",
                        item.rank(), item.productId(), rankChange);

            } catch (Exception e) {
                log.error("상품 저장 실패: productId={}", item.productId(), e);
                // 개별 상품 실패해도 전체 트랜잭션은 계속 진행
            }
        }

        log.info("랭킹 데이터 저장 완료: 총 {}개", savedCount);
        return savedCount;
    }

    @Transactional
    public Product createNewProduct(RankingItemDto item) {
        Product product = Product.builder()
                .productId(item.productId())
                .productName(item.name())
                .brandName(item.brand())
                .imageUrl(item.img())
                .productUrl(item.link())
                .isActive(true)
                .build();

        Product saved = productRepository.save(product);
        log.info("신규 상품 등록: productId={}, name={}",
                item.productId(), item.name());

        return saved;
    }

    private Product findOrCreateProduct(RankingItemDto item) {
        return productRepository.findByProductId(item.productId())
                .orElseGet(() -> createNewProduct(item));
    }

    private Integer parse(String price) {
        if (price == null || price.isEmpty()) {
            return 0;
        }

        try {
            // 숫자가 아닌 모든 문자 제거
            String cleaned = price.replaceAll("[^0-9]", "");
            return Integer.parseInt(cleaned);
        } catch (NumberFormatException e) {
            return 0;
        }
    }



    private Integer calculateRankChange(Integer currentRank, Integer previousRank) {
        if (previousRank == null) {
            return 0; // 신규 진입
        }
        return previousRank - currentRank; // 예: 10위 → 5위 = +5 (상승)
    }

    private Integer calculatePriceChange(Integer currentPrice, Integer previousPrice) {
        if (previousPrice == null) {
            return 0;
        }
        return currentPrice - previousPrice; // 예: 30000 → 25000 = -5000 (할인)
    }
}
