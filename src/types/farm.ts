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
}

export interface FarmSummary {
  totalFarmCount: number;
  ownedFarmCount: number;
  joinedFarmCount: number;
}

/** 농장 추가 요청 바디 */
export interface FarmAddRequest {
  name: string;
  area: string;
  address: string;
  cropName: string;
}

/** 농장 추가 성공 응답 */
export interface FarmAddResponse {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  myRole: string;
  createdAt: string;
  area: number;
}
