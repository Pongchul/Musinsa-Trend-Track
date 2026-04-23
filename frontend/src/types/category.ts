export interface Product {
    rank: number;
    rankChange: number;
    name: string;
    brand: string;
    price: number;
    image: string;
    trend: 'up' | 'down';
}

export type Category = 'All Categories' | 'Tops' | 'Bottoms' | 'Outerwear' | 'Accessories';
