// src/apis/farmService.ts
import type {
  FarmAddRequest,
  FarmAddResponse,
  FarmResponse,
  FarmSummary,
} from '@/types/farm';

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

/** 새로운 농장 추가하기 (POST) */
export const addFarm = async (
  farmData: FarmAddRequest,
): Promise<FarmAddResponse> => {
  const response = await axiosInstance.post('/farms/add', farmData);

  return response.data;
};
