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
import { useCoolingProducts, useRisingProducts, useMarketStats } from "@/hooks/useRankings.ts";

const MainPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category>('All');

    const { data: rising = [], isLoading: risingLoading } = useRisingProducts(selectedCategory);
    const { data: cooling = [], isLoading: coolingLoading } = useCoolingProducts(selectedCategory);
    const { data: stats } = useMarketStats();

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
                        icon={<FaArrowTrendUp/>}
                        iconBg="#eff6ff"
                        iconColor="#2563eb"
                        badge={stats?.topCategory?.changePercent != null ? `+${stats.topCategory.changePercent}%` : '-'}
                        badgeColor="#22c55e"
                        label="Top Category Today"
                        title={stats?.topCategory?.name ?? '-'}
                    />
                    <StatCard
                        icon={<FaBolt/>}
                        iconBg="#eff6ff"
                        iconColor="#4c1d95"
                        badge={stats?.biggestMover?.changePercent != null ? `+${stats.biggestMover.changePercent}%` : '-'}
                        badgeColor="#22c55e"
                        label="Biggest Mover"
                        title={stats?.biggestMover?.name ?? '-'}
                        subtitle={stats?.biggestMover?.rank != null ? `#${stats.biggestMover.rank}` : ''}
                    />
                    <StatCard
                        icon={<FaChartBar/>}
                        iconBg="#fff7ed"
                        iconColor="#f97316"
                        label="Total Volume"
                        title={stats?.totalVolume?.toLocaleString() ?? '-'}
                        subtitle="items"
                        badgeRight="Last 1h"
                    />
                </StatsRow>
                <TablesRow>
                    <ProductTable
                        title="Rapidly Rising" emoji="🔥"
                        products={rising}
                        isLoading={risingLoading}
                    />
                    <ProductTable
                        title="Cooling Down" emoji="📉"
                        products={cooling}
                        isLoading={coolingLoading}
                    />
                </TablesRow>
            </PageWrapper>
        </>
    );
}

export default MainPage;
