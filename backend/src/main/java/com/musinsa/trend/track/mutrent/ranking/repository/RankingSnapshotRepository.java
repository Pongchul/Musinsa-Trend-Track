package com.musinsa.trend.track.mutrent.ranking.repository;

import com.musinsa.trend.track.mutrent.product.domain.CategoryType;
import com.musinsa.trend.track.mutrent.product.domain.Product;
import com.musinsa.trend.track.mutrent.ranking.domain.RankingSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface RankingSnapshotRepository extends JpaRepository<RankingSnapshot, Long> {

    @Query("""
                SELECT MAX(r.snapshotDate) FROM RankingSnapshot r 
                JOIN r.product p 
                WHERE p.category = :category
            """)
    Optional<LocalDateTime> findLastestSnapshotDateByCategory(@Param("category") CategoryType categoryType);

    @Query("""
            SELECT r FROM RankingSnapshot r 
            JOIN FETCH r.product p
            WHERE p.category = :category
            AND r.snapshotDate = :snapshotDate
            ORDER BY r.rank ASC 
            """)
    List<RankingSnapshot> findLastestByCategory(@Param("category") CategoryType categoryType,
                                                @Param("snapshotDate") LocalDateTime snapshotDate);

    @Query("""
        SELECT r FROM RankingSnapshot r
        JOIN FETCH r.product p
        WHERE r.snapshotDate = (
            SELECT MAX(r2.snapshotDate) FROM RankingSnapshot r2
            JOIN r2.product p2
            WHERE p2.category = p.category
        )
        ORDER BY r.rank ASC
    """)
    List<RankingSnapshot> findAllLatest();


    Optional<RankingSnapshot> findTopByProductAndProduct_CategoryOrderBySnapshotDateDesc(
            Product product,
            CategoryType category
    );
}
