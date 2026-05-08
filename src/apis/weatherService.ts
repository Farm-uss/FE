import axiosInstance from './axios';
import type { FarmHourlyWeatherResponse } from '@/types/weather';
import type { ApiResponse } from '@/types/schedule';

export const getFarmHourlyWeather = async (
    farmId: number,
): Promise<FarmHourlyWeatherResponse> => {
    const response = await axiosInstance.get<ApiResponse<FarmHourlyWeatherResponse>>(
        `/api/farms/${farmId}/weather/hourly`,
    );

    return response.data.data;
};