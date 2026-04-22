package com.musinsa.trend.track.mutrent.ranking.repository;

import com.musinsa.trend.track.mutrent.product.domain.Product;
import com.musinsa.trend.track.mutrent.ranking.entity.RankingSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RankingSnapshotRepository extends JpaRepository<RankingSnapshot, Long> {

    Optional<RankingSnapshot> findTopByProductAndCategoryOrderBySnapshotDateDesc(
            Product product,
            String category
    );
}
