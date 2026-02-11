import type { FarmResponse } from '@/types/farm';

import axiosInstance from './axios';

export const getMyFarms = async (): Promise<FarmResponse[]> => {
  const response = await axiosInstance.get('/farms/my');
  return response.data;
};
