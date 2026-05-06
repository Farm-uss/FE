export interface CropRecommendRequest {
  location: string;
  environment: string;
  careTime: string;
  goal: string;
  harvestCycle: string;
}

export interface CropRecommendResult {
  cropName: string;
  reason: string;
}

export interface CropRecommendResponse {
  recommendations: CropRecommendResult[];
  message: string;
}
