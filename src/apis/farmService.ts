// src/apis/farmService.ts
import type { FarmResponse, FarmSummary } from '@/types/farm';

import axiosInstance from './axios';

/** 내 농장 리스트 가져오기 */
export const getMyFarms = async (): Promise<FarmResponse[]> => {
  const response = await axiosInstance.get('/farms/my');

  return response.data;
};

/** 내 농장 요약 정보 가져오기 */
export const getMyFarmsSummary = async (): Promise<FarmSummary> => {
  const response = await axiosInstance.get('/farms/my/summary');

  return response.data;
};
