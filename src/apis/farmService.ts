// src/apis/farmService.ts
import type {
  FarmAddRequest,
  FarmAddResponse,
  FarmResponse,
  FarmSummary,
} from '@/types/farm';
import type {
  CaptureResponse,
  GDDSummaryData,
  GDDSummaryResponse,
  GDDWindowResponse,
  GrowthMetricData,
  GrowthMetricType,
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

/** GDD 요약 데이터 가져오기 */
export const getGDDSummary = async (
  farmId: number,
  cropsId: number,
): Promise<GDDSummaryData> => {
  const response = await axiosInstance.get<GDDSummaryResponse>(
    `/api/v1/farms/${farmId}/crops/${cropsId}/gdd/summary`,
  );
  return response.data.data;
};
/** 성장 지표 시계열 데이터 가져오기 */
export const getGrowthMetrics = async (
  farmId: number,
  cropsId: number,
  metric: GrowthMetricType,
  windowDays?: number,
): Promise<GrowthMetricData[]> => {
  const response = await axiosInstance.get(
    `/api/v1/farms/${farmId}/crops/${cropsId}/growth-metrics`,
    { params: { metric, ...(windowDays && { windowDays }) } },
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
  // 1. FormData 객체 생성
  const formData = new FormData();
  formData.append('image', image);

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

export const captureCamera = async (
  farmId: number,
  cameraId?: number,
): Promise<CaptureResponse> => {
  const response = await axiosInstance.post(
    `/api/v1/farms/${farmId}/camera/capture`,
    null,
    { params: cameraId ? { cameraId } : {} },
  );
  return response.data;
};
//최근 이미지로 병해충 검사
export const getLatestCaptureInference = async (
  farmId: number,
  cropsId: number,
): Promise<VisionInferenceResponse> => {
  const response = await axiosInstance.post<VisionInferenceResponse>(
    `/api/v1/farms/${farmId}/crops/${cropsId}/vision-inference/latest-capture`,
  );
  return response.data;
};
