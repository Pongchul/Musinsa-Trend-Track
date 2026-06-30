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
import TrendLine from "../TrendLine/TrendLine.tsx";
import type {ProductRankingDto} from "@/apis/rankings.ts";

interface Props {
    product: ProductRankingDto;
}

const ProductRow = ({ product }: Props) => {
    const isUp = (product.rankChange ?? 0) > 0;

    return (
        <Row>
            <RankCol>
                <RankNum>{product.rank}</RankNum>
                <RankChange up={isUp}>
                    {isUp ? '↑' : '↓'} {Math.abs(product.rankChange ?? 0)}
                </RankChange>
            </RankCol>

            <ProductImage>
                <img src={product.imageUrl} alt={product.productName} />
            </ProductImage>

            <ProductInfo>
                <ProductName>{product.productName}</ProductName>
                <BrandName>{product.brandName}</BrandName>
            </ProductInfo>

            <Price>₩{product.priceNumeric?.toLocaleString()}</Price>

            <div style={{ marginLeft: '16px' }}>
                <TrendLine trend={isUp ? 'up' : 'down'} />
            </div>
        </Row>
    );
};

export default ProductRow;
