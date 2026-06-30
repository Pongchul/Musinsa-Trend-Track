package com.musinsa.trend.track.mutrent.batch.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.job.Job;
import org.springframework.batch.core.job.parameters.JobParameters;
import org.springframework.batch.core.job.parameters.JobParametersBuilder;
import org.springframework.batch.core.launch.JobOperator;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Slf4j
@Component
@EnableScheduling
@RequiredArgsConstructor
public class CrawlerScheduler {

    private final JobOperator jobOperator;
    private final Job crawlerJob;

    @Scheduled(fixedDelay = 60 * 60 * 1000L, initialDelay = 5000L)
    public void scheduleCrawl() {
        log.info("[Scheduler] 크롤링 Job 시작: {}", LocalDateTime.now());

        try {
            JobParameters params = new JobParametersBuilder()
                    .addLocalDateTime("startTime", LocalDateTime.now())
                    .toJobParameters();

            jobOperator.start(crawlerJob, params); // Job 객체 직접 전달
        } catch (Exception e) {
            log.error("[Scheduler] Job 실행 실패", e);
        }
    }
}