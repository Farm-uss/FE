/** 농장 추가 요청 데이터 (API 전송용) */
export interface FarmAddRequest {
  name: string;
  area: number;
  address: string;
  cropName: string;
  image: File | null;
}

/** 농장 추가 성공 응답 */
export interface FarmAddResponse {
  id: number;
  name: string;
  address: string;
  img: string;
  latitude: number;
  longitude: number;
  myRole: string;
  createdAt: string;
  area: number;
}

/** 기존 농장 상세 및 요약 정보 */
export interface Member {
  userId: number;
  userName: string;
  role: 'OWNER' | 'MEMBER';
}

export interface FarmResponse {
  farmId: number;
  name: string;
  location: string;
  ownerName: string;
  memberCount: number;
  members: Member[];
  crops: string[];
  role: string;
  createdDate: string;
  img: string;
}

export interface FarmSummary {
  totalFarmCount: number;
  ownedFarmCount: number;
  joinedFarmCount: number;
}
