/** /auth/me 응답 데이터 */
export interface UserProfile {
  id: number;
  email: string;
  nickname: string;
  phone_number: string;
  profileImageUrl: string;
}

/** /auth/me API 응답 래퍼 */
export interface UserProfileResponse {
  result: string;
  data: UserProfile;
  message: string | null;
}
