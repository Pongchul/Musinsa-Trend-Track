// import { Global } from '@emotion/react';
// import TopBar from '../../components/TopBar/TopBar.tsx';
// import StatCard from '../../components/StatCard/StatCard.tsx';
// import RankingChart from '../../components/RankingChart/RankingChart.tsx';
// import CategoryShare from '../../components/CategoryShare/CategoryShare.tsx';
// import RisingStars from '../../components/RisingStars/RisingStars.tsx';
// import {
//     globalStyles,
//     PageWrapper,
//     PageTitle,
//     StatsRow,
//     BottomGrid,
//     RightColumn,
// } from './BrandPage.styled.ts';
// import { FaEye } from 'react-icons/fa';
// import { FaChartSimple, FaCircleHalfStroke } from 'react-icons/fa6';
//
// const BrandPage = () => {
//     return (
//         <>
//             <Global styles={globalStyles} />
//             <TopBar />
//             <PageWrapper>
//                 <PageTitle>
//                     <h1>Brand Trends Overview</h1>
//                     <p>Real-time analysis of your brand's performance in the Musinsa ecosystem.</p>
//                 </PageTitle>
//
//                 <StatsRow>
//                     <StatCard
//                         icon={<FaChartSimple />}
//                         iconBg="#eff6ff"
//                         iconColor="#2563eb"
//                         badge="2"
//                         badgeColor="#22c55e"
//                         label="Average Rank"
//                         title="12th Place"
//                         subtitle="Top 5% of brands in category"
//                     />
//                     <StatCard
//                         icon={<FaCircleHalfStroke />}
//                         iconBg="#eff6ff"
//                         iconColor="#2563eb"
//                         badge="1.5%"
//                         badgeColor="#22c55e"
//                         label="Top 100 Share"
//                         title="15%"
//                         subtitle="3 products currently in Top 100"
//                     />
//                     <StatCard
//                         icon={<FaEye />}
//                         iconBg="#eff6ff"
//                         iconColor="#2563eb"
//                         badge="5.2%"
//                         badgeColor="#22c55e"
//                         label="Total Views"
//                         title="1.2M"
//                         subtitle="Accumulated over last 30 days"
//                     />
//                 </StatsRow>
//
//                 <BottomGrid>
//                     <RankingChart />
//                     <RightColumn>
//                         <CategoryShare />
//                         <RisingStars />
//                     </RightColumn>
//                 </BottomGrid>
//             </PageWrapper>
//         </>
//     );
// };
//
// export default BrandPage;
