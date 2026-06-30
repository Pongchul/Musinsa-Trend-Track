// src/api/rankings.ts
import { fetcher } from './fetcher';
import type {components} from "@/types/openapi.ts";
import type {PageableResponse} from "@/apis/types/PageableResponse.ts";

export type ProductRankingDto = components['schemas']['ProductRankingDto'];
export type MarketStatsDto = components['schemas']['MarketStatsDto'];

type GetRankingParams = {
    category?: string;
    page?: number;
    size?: number;
};

export const getRisingProducts = ({ category, page = 0, size = 10 }: GetRankingParams) =>
    fetcher.get<PageableResponse<ProductRankingDto>>({
        path: '/api/v1/rankings/rising',
        query: { category, page, size }, // String() 변환 불필요
    });

export const getCoolingProducts = ({ category, page = 0, size = 10 }: GetRankingParams) =>
    fetcher.get<PageableResponse<ProductRankingDto>>({
        path: '/api/v1/rankings/cooling',
        query: { category, page, size },
    });

export const getMarketStats = () =>
    fetcher.get<MarketStatsDto>({ path: '/api/v1/rankings/stats' });

