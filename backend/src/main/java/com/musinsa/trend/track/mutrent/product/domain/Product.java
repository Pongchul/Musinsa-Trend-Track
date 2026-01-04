package com.musinsa.trend.track.mutrent.product.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "products", indexes = {
        @Index(name = "idx_product_id", columnList = "productId"),
        @Index(name = "idx_brand_name", columnList = "brandName")
})
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, name = "product_id")
    private String productId;

    @Column(nullable = false, length = 500, name = "product_name")
    private String productName;

    @Column(nullable = false, length = 100, name = "brand_name")
    private String brandName;

    @Column(length = 1000)
    private String imageUrl;

    @Column(length = 2000)
    private String productUrl;

    @Column(length = 100)
    @Enumerated(EnumType.STRING)
    private CategoryType category;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private Boolean isActive;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}