//gdd 사계열
export interface GDDWindowResponse {
  from: string;
  to: string;
  windowDays: number;
  gddSum: number;
  gddCumulative: number;
}
//gdd 요약
export interface GDDSummaryData {
  farmId: number;
  cropsId: number;
  targetDays: number | null; // null 가능
  currentDays: number;
  expectedHarvestDate: string | null; // null 가능
  targetGdd: number;
  currentGdd: number;
  gddStatus: string;
  message: string;
}
export interface GDDSummaryResponse {
  success: boolean;
  code: string;
  data: GDDSummaryData;
}

//병해충 AI 추론 요청 바디 (Request Body)
export interface VisionInferenceRequest {
  image: string;
}

//병해충 AI 추론 쿼리 파라미터 (Query Parameters)

export interface VisionInferenceParams {
  cameraId?: number;
  measuredAt?: string; // ISO 8601 형식 (e.g. 2026-03-30T03:09:29.078Z)
}

//병해충 AI 추론 상세 데이터 (Response Data)

export interface VisionInferenceData {
  diseaseStatus: number; // 병해 상태 (예: 0-정상, 1-주의, 2-위험 등)
  diseaseId: string; // 병해 고유 ID (예: "a7")
  diseaseName: string; // 병해 이름 (예: "잎마름병")
  diseaseDescription: string; // 병해 설명
  confidence: number; // 분석 신뢰도 (0~100)
  causes: string[]; // 발생 원인 리스트
  symptoms: string[]; // 주요 증상 리스트
  solutions: string[]; // 해결 방안 및 조치 리스트
  uploadedImageId: number; // 서버에 업로드된 이미지 ID
  inferenceId: number; // 추론 기록 ID
  modelName: string; // 사용된 AI 모델명
  modelVersion: string; // AI 모델 버전
  inferredAt: string; // 추론 완료 시점 (ISO 8601)
}

//병해충 AI 추론 전체 응답 구조 (API Response)

export interface VisionInferenceResponse {
  success: boolean;
  code: string;
  data: VisionInferenceData;
}

//적정 범위 데이터
export interface OptimalRangeSensor {
  label: string;
  unit: string;
  min: number;
  max: number;
}

export interface OptimalRangeResponse {
  cropName: string;
  cropCode: string;
  temperature: OptimalRangeSensor;
  ph: OptimalRangeSensor;
  soilMoisture: OptimalRangeSensor;
  co2: OptimalRangeSensor;
  ec: OptimalRangeSensor;
  illuminance: OptimalRangeSensor;
}
