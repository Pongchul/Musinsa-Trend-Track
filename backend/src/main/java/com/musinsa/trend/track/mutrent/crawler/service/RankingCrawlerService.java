package com.musinsa.trend.track.mutrent.crawler.service;

import com.musinsa.trend.track.mutrent.crawler.dto.CrawledDataRequest;
import com.musinsa.trend.track.mutrent.crawler.dto.RankingItemDto;
import com.musinsa.trend.track.mutrent.product.domain.CategoryType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class RankingCrawlerService {

    private final RankingItemSaver rankingItemSaver; // 별도 Bean 주입

    // @Transactional 제거 — 상품별로 독립 트랜잭션 사용
    public int saveRankingData(CrawledDataRequest request) {
        CategoryType category = request.category();
        LocalDateTime snapshotDate = LocalDateTime.now()
                .truncatedTo(ChronoUnit.HOURS);

        log.info("랭킹 데이터 저장 시작: category={}, snapshotDate={}, count={}",
                category, snapshotDate, request.rankings().size());

        int savedCount = 0;
        int failedCount = 0;

        for (RankingItemDto item : request.rankings()) {
            try {
                rankingItemSaver.saveOne(item, category, snapshotDate);
                savedCount++;
            } catch (Exception e) {
                failedCount++;
                log.error("상품 저장 실패 (건너뜀): rank={}, productId={}",
                        item.rank(), item.productId(), e);
            }
        }

        log.info("랭킹 데이터 저장 완료: 성공={}, 실패={}", savedCount, failedCount);
        return savedCount;
    }
}