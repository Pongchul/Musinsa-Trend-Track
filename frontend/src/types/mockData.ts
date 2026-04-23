import type {Product} from "./category.ts";

export const risingProducts: Product[] = [
    { rank: 1, rankChange: 12, name: 'Wide Denim Pants', brand: 'Musinsa Standard', price: 54000, image: '👖', trend: 'up' },
    { rank: 2, rankChange: 8, name: 'Cotton Oversized Tee', brand: 'Covernat', price: 32000, image: '👕', trend: 'up' },
    { rank: 3, rankChange: 5, name: 'Vintage Leather Jacket', brand: 'Vivant', price: 128000, image: '🧥', trend: 'up' },
    { rank: 4, rankChange: 3, name: 'Oxford Striped Shirt', brand: 'Polo Ralph', price: 89000, image: '👔', trend: 'up' },
];

export const coolingProducts: Product[] = [
    { rank: 45, rankChange: 8, name: 'Summer Graphic Tee', brand: 'Thisisneverthat', price: 39000, image: '👕', trend: 'down' },
    { rank: 32, rankChange: 5, name: 'Basic Linen Shirt', brand: 'Giordano', price: 29900, image: '👕', trend: 'down' },
    { rank: 18, rankChange: 3, name: 'Knit Crop Top', brand: 'Sculptor', price: 42000, image: '🧶', trend: 'down' },
    { rank: 67, rankChange: 12, name: 'Classic Pique Polo', brand: 'Lacoste', price: 109000, image: '👕', trend: 'down' },
];
