// API 응답 알림 아이템
export interface NotificationItem {
  id: number;
  farmId: number;
  message: string;
  type: string;
  typeDescription: string;
  createdAt: string;
  read: boolean;
}

// 페이지네이션 응답
export interface NotificationResponse {
  content: NotificationItem[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  number: number;
}

// 기존 UI용 (NotificationDropdown에서 쓰던 것)
export interface Notification {
  id: number;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}
