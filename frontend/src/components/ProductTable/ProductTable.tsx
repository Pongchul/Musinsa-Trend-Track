import {Card, Header, Section, TableHeader, TableHeaderCell, Title, ViewAll} from "./ProductTable.styled.ts";
import ProductRow from "../ProductRow/ProductRow.tsx";
import type {ProductRankingDto} from "@/apis/rankings.ts";

interface Props {
    title: string;
    emoji: string;
    products: ProductRankingDto[];
    isLoading?: boolean;
}



const ProductTable = ({ title, emoji, products }: Props) => {
    return (
        <Section>
            <Header>
                <Title>
                    {title} {emoji}
                </Title>
                <ViewAll>View All</ViewAll>
            </Header>
            <Card>
                <TableHeader>
                    <TableHeaderCell>Rank</TableHeaderCell>
                    <TableHeaderCell>Product</TableHeaderCell>
                    <TableHeaderCell style={{ textAlign: 'right' }}>Price</TableHeaderCell>
                    <TableHeaderCell style={{ textAlign: 'center' }}>Trend</TableHeaderCell>
                </TableHeader>
                {products.map((p) => (
                    <ProductRow key={p.rank} product={p} />
                ))}
            </Card>
        </Section>
    );
};

export default ProductTable;
