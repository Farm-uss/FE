export interface HourlyWeatherItem {
    forecastTime: string;
    label: string;
    displayTime: string;
    temperature: number;
    weather: string;
    weatherText: string;
    icon: string;
}

export interface FarmHourlyWeatherResponse {
    farmId: number;
    regionName: string;
    address: string;
    latitude: number;
    longitude: number;
    hourlyForecast: HourlyWeatherItem[];
    updatedAt: string;
    cached: boolean;
}