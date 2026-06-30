package com.musinsa.trend.track.mutrent.batch.job;

import com.musinsa.trend.track.mutrent.batch.infrastructure.CrawlerClient;
import com.musinsa.trend.track.mutrent.crawler.dto.CrawlerRequest;
import com.musinsa.trend.track.mutrent.crawler.dto.CrawlerResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.job.Job;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.Step;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.infrastructure.repeat.RepeatStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import java.util.List;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class CrawlerJobConfig {

    private final JobRepository jobRepository;
    private final PlatformTransactionManager transactionManager;
    private final CrawlerClient crawlerClient;

    @Bean
    public Job crawlerJob() {
        return new JobBuilder("crawlerJob", jobRepository)
                .start(crawlStep())
                .build();
    }

    @Bean
    public Step crawlStep() {
        return new StepBuilder("crawlStep", jobRepository)
                .tasklet(crawlTasklet(), transactionManager)
                .build();
    }

    @Bean
    public Tasklet crawlTasklet() {
        return (contribution, chunkContext) -> {
            log.info("[Batch] 크롤링 트리거 시작");

            CrawlerRequest request = new CrawlerRequest(
                    List.of("ALL", "TOP", "OUTER", "PANTS", "ACCESSORY")
            );

            try {
                CrawlerResponse response = crawlerClient.triggerCrawl(request);
                log.info("[Batch] 크롤러 응답: {}", response.message());
            } catch (Exception e) {
                log.error("[Batch] 크롤러 호출 실패", e);
                contribution.setExitStatus(ExitStatus.FAILED);
                return RepeatStatus.FINISHED;
            }

            // 크롤링 완료까지 폴링 (최대 10분)
            boolean success = crawlerClient.waitUntilDone(120, 5);
            if (!success) {
                log.error("[Batch] 크롤링 타임아웃");
                contribution.setExitStatus(ExitStatus.FAILED);
            } else {
                log.info("[Batch] 크롤링 완료");
            }

            return RepeatStatus.FINISHED;
        };
    }
}
