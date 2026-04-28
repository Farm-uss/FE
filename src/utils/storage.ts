const KEYS = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  nickname: 'nickname',
  id: 'id',
} as const;

export const storage = {
  // Access Token
  getAccessToken: () => localStorage.getItem(KEYS.accessToken),
  setAccessToken: (token: string) =>
    localStorage.setItem(KEYS.accessToken, token),
  removeAccessToken: () => localStorage.removeItem(KEYS.accessToken),

  // Refresh Token
  getRefreshToken: () => localStorage.getItem(KEYS.refreshToken),
  setRefreshToken: (token: string) =>
    localStorage.setItem(KEYS.refreshToken, token),
  removeRefreshToken: () => localStorage.removeItem(KEYS.refreshToken),

  // Nickname
  getNickname: () => localStorage.getItem(KEYS.nickname),
  setNickname: (name: string) => localStorage.setItem(KEYS.nickname, name),
  removeNickname: () => localStorage.removeItem(KEYS.nickname),

  // ID
  getId: () => localStorage.getItem(KEYS.id),
  setId: (id: string) => localStorage.setItem(KEYS.id, id),

  // 로그아웃 시 한 번에 정리
  clearAuth: () => {
    localStorage.removeItem(KEYS.accessToken);
    localStorage.removeItem(KEYS.refreshToken);
    localStorage.removeItem(KEYS.nickname);
    localStorage.removeItem(KEYS.id);
  },
};
