// src/apis/farmService.ts
import type {
  FarmAddRequest,
  FarmAddResponse,
  FarmResponse,
  FarmSummary,
} from '@/types/farm';
import type {
  GDDWindowResponse,
  OptimalRangeResponse,
  VisionInferenceResponse,
} from '@/types/farmService';

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
  const formData = new FormData();

  if (farmData.image) {
    formData.append('image', farmData.image);
  } else {
    // 기본 이미지일 때 서버 가이드가 null 전송이라면 아래처럼 추가
    // formData.append('image', new Blob(), ""); // 혹은 아예 안 보낼 수도 있어.
    formData.append('image', new Blob(), '');
  }
  console.log(formData);
  const response = await axiosInstance.post('/farms/add', formData, {
    params: {
      name: farmData.name,
      area: farmData.area,
      address: farmData.address,
      cropName: farmData.cropName,
    },

    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

//친구 내보내기
export const removeFarmMember = async (
  farmId: number,
  memberUserId: number,
): Promise<void> => {
  await axiosInstance.delete(`/farms/${farmId}/members/${memberUserId}`);
};

/** GDD 그래프 데이터 가져오기 */
export const getGDDWindows = async (
  farmId: number,
  cropsId: number,
  windowDays: number,
): Promise<GDDWindowResponse[]> => {
  const response = await axiosInstance.get(
    `/api/v1/farms/${farmId}/crops/${cropsId}/gdd/windows`,
    { params: { windowDays } },
  );
  return response.data;
};

/**
 * 병해충 AI 추론 API (Multipart 방식)
 * @param image 실제 File 객체
 */
export const postVisionInference = async (
  farmId: number,
  cropsId: number,
  image: File,
): Promise<VisionInferenceResponse> => {
  // 1. FormData 객체 생성 (멀티파트 봉투 만들기)
  const formData = new FormData();
  formData.append('image', image); // 백엔드에서 받는 필드명 'image'

  // 2. 요청 보내기 (axios가 FormData를 보고 자동으로 헤더를 설정해줘!)
  const response = await axiosInstance.post(
    `/api/v1/farms/${farmId}/crops/${cropsId}/vision-inference`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const getFarmOptimalRange = async (
  farmId: number,
): Promise<OptimalRangeResponse> => {
  const response = await axiosInstance.get(`/api/v1/farms/${farmId}/dashboard`);
  return response.data;
};
