import { useCallback, useEffect, useState } from 'react';

import { getFarmHourlyWeather } from '@/apis/weatherService';

import type { FarmHourlyWeatherResponse } from '@/types/weather';

export const useFarmWeather = (farmId: number | null) => {
    const [weather, setWeather] =
        useState<FarmHourlyWeatherResponse | null>(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState<unknown>(null);

    const refetch = useCallback(async () => {
        if (farmId === null || Number.isNaN(farmId)) return;

        try {
            setLoading(true);

            const response = await getFarmHourlyWeather(farmId);

            setWeather(response);
        } catch (err) {
            setError(err);
            console.error('날씨 조회 실패:', err);
        } finally {
            setLoading(false);
        }
    }, [farmId]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return {
        weather,
        loading,
        error,
        refetch,
    };
};