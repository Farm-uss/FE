import type { EnvData, EnvDataResponse } from '@/types/farmService';

import axiosInstance from './axios';

/** 디바이스의 최신 envDataId 가져오기 */
export const getLatestEnvDataId = async (deviceId: number): Promise<number> => {
  const response = await axiosInstance.get<number>(
    `/api/env-data/latest/${deviceId}`,
  );
  return response.data;
};
/** envDataId로 실제 센서값 가져오기 */
export const getEnvDataById = async (envDataId: number): Promise<EnvData> => {
  const response = await axiosInstance.get<EnvDataResponse>(
    `/api/env-data/${envDataId}`,
  );

  return response.data.data;
};
