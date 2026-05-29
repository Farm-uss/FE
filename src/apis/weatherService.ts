import axiosInstance from './axios';
import type { FarmHourlyWeatherResponse } from '@/types/weather';

export const getFarmHourlyWeather = async (
    farmId: number,
): Promise<FarmHourlyWeatherResponse> => {
    const response = await axiosInstance.get<FarmHourlyWeatherResponse>(
        `/api/farms/${farmId}/weather/hourly`,
    );

    return response.data;
};
