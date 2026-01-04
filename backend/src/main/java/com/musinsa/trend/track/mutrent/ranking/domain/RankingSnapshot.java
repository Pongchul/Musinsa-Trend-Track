package com.musinsa.trend.track.mutrent.ranking.domain;

import com.musinsa.trend.track.mutrent.product.domain.Product;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "ranking_snapshots", indexes = {
        @Index(name = "idx_snapshot_date", columnList = "snapshotDate"),
        @Index(name = "idx_product_snapshot", columnList = "productId, snapshotDate"),
        @Index(name = "idx_category_snapshot", columnList = "category, snapshotDate"),
        @Index(name = "idx_rank_snapshot", columnList = "category, snapshotDate, rank")
})
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RankingSnapshot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Integer rank;

    @Column(nullable = false)
    private LocalDateTime snapshotDate;

    @Column(nullable = false, length = 50)
    private String price;

    @Column(nullable = false)
    private Integer priceNumeric;

    @Column(length = 10)
    private String discountRate;

    @Column
    private Integer discountRateNumeric;

    @Column
    private Integer previousRank;

    @Column
    private Integer rankChange;

    @Column
    private Integer previousPrice;

    @Column
    private Integer priceChange;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}