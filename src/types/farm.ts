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

export interface Member {
  userId: number;
  userName: string;
  role: 'OWNER' | 'MEMBER';
  profileImg: string | null; // ✨ 데이터에 있는 프로필 이미지 추가
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
  area?: number;
  cropCode: string;
  cropsId: number;
}

export interface FarmSummary {
  totalFarmCount: number;
  ownedFarmCount: number;
  joinedFarmCount: number;
}
