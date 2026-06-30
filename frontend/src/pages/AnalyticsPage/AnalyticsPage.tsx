import Topbar from "../../components/TopBar/TopBar.tsx";
import { Global } from "@emotion/react";
import {
    globalStyles,
    PageWrapper,
    Container,
    PageTitle,
    FilterCard,
    FilterRow,
    FilterGroup,
    FilterLabel,
    SearchInput,
    SearchIcon,
    DateInput,
    ArrowIcon,
    CategorySelect,
    ApplyBtn,
    TagRow,
    Tag,
    ResetBtn,
    TableCard,
    Table,
    Thead,
    Tbody,
    Th,
    Tr,
    Td,
    TrendBadge,
    ProductInfo,
    ProductImg,
    ProductMeta,
    BrandName,
    ProductName,
    CategoryBadge,
    Price,
    ActionBtn,
    Pagination,
    PageBtn,
    ShowingText,
    PaginationRight,
} from "./AnalyticsPage.styled.ts";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useState } from "react";

const mockProducts = [
    {
        rank: 1,
        trendDelta: 4,
        trendDir: "up",
        brand: "THISISNEVERTHAT",
        name: "T-Logo Down Jacket Black",
        img: "https://image.musinsa.com/mfiles/goods/2023/10/01/510590_1696128600.jpg",
        category: "Outerwear",
        price: "₩189,000",
        prevRank: 5,
    },
    {
        rank: 2,
        trendDelta: null,
        trendDir: "neutral",
        brand: "NIKE",
        name: "Air Force 1 '07 White",
        img: "https://image.musinsa.com/mfiles/goods/2022/05/10/123456_1652345600.jpg",
        category: "Shoes",
        price: "₩139,000",
        prevRank: 2,
    },
    {
        rank: 3,
        trendDelta: 2,
        trendDir: "down",
        brand: "COVERNAT",
        name: "C Logo Hoodie Grey",
        img: "https://image.musinsa.com/mfiles/goods/2023/08/15/234567_1692345600.jpg",
        category: "Tops",
        price: "₩79,000",
        prevRank: 1,
    },
    {
        rank: 4,
        trendDelta: 12,
        trendDir: "up",
        brand: "LEE",
        name: "Twitch Logo Standard Fit",
        img: "https://image.musinsa.com/mfiles/goods/2023/09/01/345678_1693345600.jpg",
        category: "Tops",
        price: "₩42,000",
        prevRank: 16,
    },
    {
        rank: 5,
        trendDelta: 2,
        trendDir: "up",
        brand: "MUSINSA STANDARD",
        name: "Cashmere Blend Oversized Coat",
        img: "https://image.musinsa.com/mfiles/goods/2023/10/10/456789_1696900000.jpg",
        category: "Outerwear",
        price: "₩159,900",
        prevRank: 7,
    },
];

const PRODUCT_IMGS = [
    "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=80&h=80&fit=crop",
];

const AnalyticsPage = () => {
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const products = mockProducts.map((p, i) => ({ ...p, img: PRODUCT_IMGS[i] }));

    return (
        <>
            <Global styles={globalStyles} />
            <Topbar />
            <PageWrapper>
                <Container>
                    <PageTitle>
                        <h1>Product Ranking Comparison</h1>
                        <p>Analyze ranking shifts and spot emerging trends between two distinct time periods.</p>
                    </PageTitle>

                    {/* Filter Card */}
                    <FilterCard>
                        <FilterRow>
                            <FilterGroup style={{ flex: 2 }}>
                                <FilterLabel>SEARCH PRODUCTS</FilterLabel>
                                <SearchInput>
                                    <SearchIcon><FaMagnifyingGlass size={14} /></SearchIcon>
                                    <input placeholder="Product name, Brand, or ID..." />
                                </SearchInput>
                            </FilterGroup>

                            <FilterGroup>
                                <FilterLabel>BASE DATE</FilterLabel>
                                <DateInput>
                                    <span>Nov 01, 2023</span>
                                    <span style={{ color: "#aaa" }}>📅</span>
                                </DateInput>
                            </FilterGroup>

                            <ArrowIcon><FiArrowRight size={16} color="#aaa" /></ArrowIcon>

                            <FilterGroup>
                                <FilterLabel>COMPARE TO</FilterLabel>
                                <DateInput>
                                    <span>Oct 01, 2023</span>
                                    <span style={{ color: "#aaa" }}>📅</span>
                                </DateInput>
                            </FilterGroup>

                            <FilterGroup>
                                <FilterLabel>CATEGORY</FilterLabel>
                                <CategorySelect>
                                    <select>
                                        <option>All Categories</option>
                                        <option>Outerwear</option>
                                        <option>Tops</option>
                                        <option>Shoes</option>
                                    </select>
                                </CategorySelect>
                            </FilterGroup>

                            <ApplyBtn>
                                <span>≡</span> Apply
                            </ApplyBtn>
                        </FilterRow>

                        <TagRow>
                            <Tag active={activeTag === "category"} onClick={() => setActiveTag(activeTag === "category" ? null : "category")}>
                                Category: All ×
                            </Tag>
                            <Tag active={activeTag === "compare"} onClick={() => setActiveTag(activeTag === "compare" ? null : "compare")}>
                                Compare: 1 Month ×
                            </Tag>
                            <ResetBtn>Reset all</ResetBtn>
                        </TagRow>
                    </FilterCard>

                    {/* Table */}
                    <TableCard>
                        <Table>
                            <Thead>
                                <tr>
                                    <Th>RANK</Th>
                                    <Th>TREND</Th>
                                    <Th>PRODUCT INFO</Th>
                                    <Th>CATEGORY</Th>
                                    <Th style={{ textAlign: "right" }}>PRICE</Th>
                                    <Th style={{ textAlign: "right" }}>PREV RANK</Th>
                                    <Th>ACTION</Th>
                                </tr>
                            </Thead>
                            <Tbody>
                                {products.map((p) => (
                                    <Tr key={p.rank}>
                                        <Td><strong style={{ fontSize: 18 }}>{p.rank}</strong></Td>
                                        <Td>
                                            {p.trendDir === "neutral" ? (
                                                <span style={{ color: "#aaa", fontSize: 14 }}>— —</span>
                                            ) : (
                                                <TrendBadge dir={p.trendDir as "up" | "down"}>
                                                    {p.trendDir === "up" ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                                                    {p.trendDelta}
                                                </TrendBadge>
                                            )}
                                        </Td>
                                        <Td>
                                            <ProductInfo>
                                                <ProductImg src={p.img} alt={p.name} />
                                                <ProductMeta>
                                                    <BrandName>{p.brand}</BrandName>
                                                    <ProductName>{p.name}</ProductName>
                                                </ProductMeta>
                                            </ProductInfo>
                                        </Td>
                                        <Td><CategoryBadge>{p.category}</CategoryBadge></Td>
                                        <Td style={{ textAlign: "right" }}><Price>{p.price}</Price></Td>
                                        <Td style={{ textAlign: "right", color: "#888", fontSize: 14 }}>{p.prevRank}</Td>
                                        <Td>
                                            <ActionBtn><FiExternalLink size={16} /></ActionBtn>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>

                        <Pagination>
                            <ShowingText>Showing <strong>1-5</strong> of <strong>100</strong> products</ShowingText>
                            <PaginationRight>
                                <PageBtn disabled>Previous</PageBtn>
                                {[1, 2, 3].map((n) => (
                                    <PageBtn key={n} active={currentPage === n} onClick={() => setCurrentPage(n)}>{n}</PageBtn>
                                ))}
                                <PageBtn disabled style={{ pointerEvents: "none" }}>...</PageBtn>
                                <PageBtn onClick={() => setCurrentPage(10)}>10</PageBtn>
                                <PageBtn onClick={() => setCurrentPage(Math.min(currentPage + 1, 10))}>Next</PageBtn>
                            </PaginationRight>
                        </Pagination>
                    </TableCard>
                </Container>
            </PageWrapper>
        </>
    );
};

export default AnalyticsPage;
