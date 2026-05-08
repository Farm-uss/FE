export type PlaceType =
  | 'INDOOR_WINDOW_DESK'
  | 'APARTMENT_BALCONY'
  | 'ROOFTOP_YARD_GARDEN'
  | 'SMART_FARM_LIGHTING';

export type CareTimeType =
  | 'UNDER_FIVE_MINUTES'
  | 'AROUND_FIFTEEN_MINUTES'
  | 'OVER_THIRTY_MINUTES'
  | 'ONCE_OR_TWICE_A_WEEK';

export type PurposeType =
  | 'PRACTICAL_FOOD'
  | 'HEALING_AESTHETIC'
  | 'EDUCATION_OBSERVATION'
  | 'COST_EFFECTIVE';

export type HarvestCycleType =
  | 'SHORT_TERM'
  | 'MID_TERM'
  | 'LONG_TERM'
  | 'CONTINUOUS';

export type DifficultyType = 'EASY' | 'NORMAL' | 'HARD';

export interface CropRecommendRequest {
  location: string;
  place: PlaceType;
  careTime: CareTimeType;
  purpose: PurposeType;
  harvestCycle: HarvestCycleType;
}

export interface CropRecommendResult {
  rank: number;
  cropName: string;
  reason: string;
  difficulty: DifficultyType;
  harvestCycle: string;
  estimatedHarvestDays: number;
}

export interface CropRecommendResponse {
  recommendations: CropRecommendResult[];
  message: string;
}
