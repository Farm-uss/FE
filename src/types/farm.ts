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
