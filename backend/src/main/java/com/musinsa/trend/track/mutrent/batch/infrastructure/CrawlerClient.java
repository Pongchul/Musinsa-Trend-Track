package com.musinsa.trend.track.mutrent.batch.infrastructure;

import com.musinsa.trend.track.mutrent.crawler.dto.CrawlerRequest;
import com.musinsa.trend.track.mutrent.crawler.dto.CrawlerResponse;
import com.musinsa.trend.track.mutrent.crawler.dto.StatusResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.beans.factory.annotation.Value;

@Slf4j
@Component
public class CrawlerClient {

    private final RestClient restClient;


    public CrawlerClient(
            @Value("${crawler.base-url:http://localhost:8000}") String baseUrl
    ) {
        this.restClient = RestClient.builder()
                .baseUrl(baseUrl)
                .build();
    }

    public CrawlerResponse triggerCrawl(CrawlerRequest request) {
        return restClient.post()
                .uri("/crawl")
                .body(request)
                .retrieve()
                .body(CrawlerResponse.class);
    }

    public StatusResponse getStatus() {
        return restClient.get()
                .uri("/status")
                .retrieve()
                .body(StatusResponse.class);
    }

    /**
     * 크롤링이 끝날 때까지 폴링
     *
     * @param maxRetries 최대 재시도 횟수
     * @param intervalSec 폴링 간격 (초)
     * @return 정상 완료 여부
     */
    public boolean waitUntilDone(int maxRetries, int intervalSec) {
        for (int i = 0; i < maxRetries; i++) {
            try {
                Thread.sleep(intervalSec * 1000L);
                StatusResponse status = getStatus();
                log.info("[Batch] 크롤링 상태 확인 ({}/{}): running={}", i + 1, maxRetries, status.is_running());

                if (!status.is_running()) {
                    return true;
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return false;
            } catch (Exception e) {
                log.warn("[Batch] 상태 확인 실패: {}", e.getMessage());
            }
        }
        return false;
    }
}
