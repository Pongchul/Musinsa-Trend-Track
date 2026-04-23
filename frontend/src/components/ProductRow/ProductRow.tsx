import {
    BrandName, Price,
    ProductImage,
    ProductInfo,
    ProductName,
    RankChange,
    RankCol,
    RankNum,
    Row
} from "./ProductRow.styled.ts";
import type {Product} from "../../types/category.ts";
import TrendLine from "../TrendLine/TrendLine.tsx";

interface Props {
    product: Product;
}


const ProductRow = ({ product }: Props) => {
    const isUp = product.trend === 'up';

    return (
        <Row>
            <RankCol>
                <RankNum>{product.rank}</RankNum>
                <RankChange up={isUp}>
                    {isUp ? '↑' : '↓'} {product.rankChange}
                </RankChange>
            </RankCol>

            <ProductImage>{product.image}</ProductImage>

            <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <BrandName>{product.brand}</BrandName>
            </ProductInfo>

            <Price>₩{product.price.toLocaleString()}</Price>

            <div style={{ marginLeft: '16px' }}>
                <TrendLine trend={product.trend} />
            </div>
        </Row>
    );
};

export default ProductRow;
