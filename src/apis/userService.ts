import type { UserProfile, UserProfileResponse } from '@/types/user';

import axiosInstance from './axios';

/** 내 프로필 정보 가져오기 */
export const getMyProfile = async (): Promise<UserProfile> => {
  const response = await axiosInstance.get<UserProfileResponse>('/auth/me');
  return response.data.data;
};
