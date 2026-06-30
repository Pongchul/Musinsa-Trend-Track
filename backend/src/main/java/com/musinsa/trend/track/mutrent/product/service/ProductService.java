package com.musinsa.trend.track.mutrent.product.service;

import com.musinsa.trend.track.mutrent.crawler.dto.RankingItemDto;
import com.musinsa.trend.track.mutrent.product.domain.Product;
import com.musinsa.trend.track.mutrent.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Product findOrCreateProduct(RankingItemDto item) {
        return productRepository.findByProductId(item.productId())
                .orElseGet(() -> {
                    Product product = Product.builder()
                            .productId(item.productId())
                            .productName(item.name())
                            .brandName(item.brand())
                            .imageUrl(item.img())
                            .productUrl(item.link())
                            .isActive(true)
                            .build();
                    Product saved = productRepository.save(product);
                    log.info("신규 상품 등록: productId={}", item.productId());
                    return saved;
                });
    }
}
