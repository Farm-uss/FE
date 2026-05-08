import type {
  CropRecommendRequest,
  CropRecommendResponse,
} from '@/types/cropRecommend';

import axiosInstance from './axios';

export const getCropRecommendations = async (
  data: CropRecommendRequest,
): Promise<CropRecommendResponse> => {
  const response = await axiosInstance.post('/api/v1/crops-recommend/ai', data);
  return response.data;
};
