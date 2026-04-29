package com.musinsa.trend.track.mutrent.crawler.controller;


import com.musinsa.trend.track.mutrent.crawler.dto.CrawledDataRequest;
import com.musinsa.trend.track.mutrent.crawler.dto.CrawlerResponse;
import com.musinsa.trend.track.mutrent.crawler.service.RankingCrawlerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/crawler")
@RequiredArgsConstructor
public class CrawlerController {

    private final RankingCrawlerService crawlerService;

    @PostMapping("/rankings")
    public ResponseEntity<CrawlerResponse> saveRankings(@RequestBody CrawledDataRequest request) {
        log.info("크롤링 데이터 수신: category={}, count={}",
                request.category(), request.rankings().size());

        try {
            int savedCount = crawlerService.saveRankingData(request);
            return ResponseEntity.ok(
                    new CrawlerResponse(true, "크롤링 데이터 저장 완료", savedCount)
            );
        } catch (Exception e) {
            log.error("랭킹 데이터 저장 실패", e);
            return ResponseEntity.internalServerError()
                    .body(new CrawlerResponse(false, "저장 실패: " + e.getMessage(), 0));
        }
    }
}