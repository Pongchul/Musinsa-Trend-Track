package com.musinsa.trend.track.mutrent.product.domain;

enum CategoryType {
    TOP("상의"),
    OUTER("아우터"),
    PANTS("바지"),
    SHOES("신발"),
    BAG("가방"),
    ACCESSORY("액세서리");

    private final String description;

    CategoryType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}