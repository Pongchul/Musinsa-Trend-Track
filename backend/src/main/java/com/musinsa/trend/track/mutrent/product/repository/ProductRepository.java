package com.musinsa.trend.track.mutrent.product.repository;

import com.musinsa.trend.track.mutrent.product.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByProductId(String productId);
}
