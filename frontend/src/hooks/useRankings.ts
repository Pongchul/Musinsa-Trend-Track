// src/hooks/useRankings.ts
import { useQuery } from '@tanstack/react-query';
import {getCoolingProducts, getMarketStats, getRisingProducts} from "@/apis/rankings.ts";

export const RANKING_KEYS = {
    rising: (category: string) => ['rankings', 'rising', category] as const,
    cooling: (category: string) => ['rankings', 'cooling', category] as const,
    stats: () => ['rankings', 'stats'] as const,
};

export const useRisingProducts = (category: string) =>
    useQuery({
        queryKey: RANKING_KEYS.rising(category),
        queryFn: () => getRisingProducts({ category }),
        select: (data) => data?.content, // PageableResponse에서 content만 꺼냄
    });

export const useCoolingProducts = (category: string) =>
    useQuery({
        queryKey: RANKING_KEYS.cooling(category),
        queryFn: () => getCoolingProducts({ category }),
        select: (data) => data?.content,
    });

export const useMarketStats = () =>
    useQuery({
        queryKey: RANKING_KEYS.stats(),
        queryFn: getMarketStats,
        staleTime: 1000 * 60 * 10,
    });
