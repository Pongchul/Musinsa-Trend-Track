package com.musinsa.trend.track.mutrent.ranking.controller;

import com.musinsa.trend.track.mutrent.ranking.dto.LatestRankingDto;
import com.musinsa.trend.track.mutrent.ranking.dto.MarketStatsDto;
import com.musinsa.trend.track.mutrent.ranking.dto.ProductRankingDto;
import com.musinsa.trend.track.mutrent.ranking.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rankings")
@RequiredArgsConstructor
public class RankingController {

    private final RankingService rankingService;

    @GetMapping("/rising")
    public ResponseEntity<Page<ProductRankingDto>> getRising(
            @RequestParam(required = false) String category,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        return ResponseEntity.ok(rankingService.getRisingProducts(category, pageable));
    }

    @GetMapping("/cooling")
    public ResponseEntity<Page<ProductRankingDto>> getCooling(
            @RequestParam(required = false) String category,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        return ResponseEntity.ok(rankingService.getCoolingProducts(category, pageable));
    }

    @GetMapping("/stats")
    public ResponseEntity<MarketStatsDto> getStats() {
        return ResponseEntity.ok(rankingService.getMarketStats());
    }

//    @GetMapping("/latest")
//    public ResponseEntity<Page<LatestRankingDto>> getLatestRankings(
//            @RequestParam(required = false) String category,
//            @PageableDefault(size = 10) Pageable pageable
//    ) {
//        return ResponseEntity.ok(rankingService.)
//    }
}