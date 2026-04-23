import Topbar from "../../components/TopBar/TopBar.tsx";
import {Global} from "@emotion/react";
import {Container, globalStyles, PageTitle, PageWrapper, StatsRow, TablesRow} from "./MainPage.styled.ts";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter.tsx";
import type {Category} from "../../types/category.ts";
import {useState} from "react";
import StatCard from "../../components/StatCard/StatCard.tsx";

import { FaBolt, FaChartBar } from "react-icons/fa";
import {FaArrowTrendUp} from "react-icons/fa6";
import ProductTable from "../../components/ProductTable/ProductTable.tsx";
import {coolingProducts, risingProducts} from "../../types/mockData.ts";

const MainPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category>('All Categories');

    return (
        <>
            <Global styles={globalStyles}/>
            <Topbar/>
            <PageWrapper>
                <Container>
                    <PageTitle>
                        <h1>Today's Market Trends 🚀</h1>
                        <p>Real-time ranking changes from Musinsa store.</p>
                    </PageTitle>
                    <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory}/>
                </Container>
                <StatsRow>
                    <StatCard
                        icon={<FaArrowTrendUp />}
                        iconBg="#eff6ff"
                        iconColor="#2563eb"
                        badge="+12%"
                        badgeColor="#22c55e"
                        label="Top Category Today"
                        title="Wide Denim Pants"
                    />
                    <StatCard
                        icon={<FaBolt />}
                        iconBg="#eff6ff"
                        iconColor="#4c1d95"
                        badge="+85%"
                        badgeColor="#22c55e"
                        label="Biggest Mover"
                        title="Logo Hoodie"
                        subtitle="#45"
                    />
                    <StatCard
                        icon={<FaChartBar />}
                        iconBg="#fff7ed"
                        iconColor="#f97316"
                        label="Total Volume"
                        title="12,403"
                        subtitle="items"
                        badgeRight="Last 24h"
                    />
                </StatsRow>
                <TablesRow>
                    <ProductTable title="Rapidly Rising" emoji="🔥" products={risingProducts} />
                    <ProductTable title="Cooling Down" emoji="📉" products={coolingProducts} />
                </TablesRow>
            </PageWrapper>
        </>
    );
}

export default MainPage;
