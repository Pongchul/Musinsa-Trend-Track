package com.musinsa.trend.track.mutrent.crawler.dto;

public record StatusResponse(
        boolean is_running,
        String last_run,
        Object last_result
) {}