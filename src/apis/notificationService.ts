import type { NotificationResponse } from '@/types/notification';

import axiosInstance from './axios';

export const getNotifications = async (
  page = 0,
  size = 10,
): Promise<NotificationResponse> => {
  const res = await axiosInstance.get('/api/notifications', {
    params: { page, size, sort: 'createdAt,desc' },
  });
  return res.data;
};
//알림 하나 읽기
export const readNotification = async (
  notificationId: number,
): Promise<void> => {
  await axiosInstance.patch(`/api/notifications/${notificationId}/read`);
};

//전체 알림 읽기
export const readAllNotifications = async (): Promise<void> => {
  await axiosInstance.patch('/api/notifications/read-all');
};
// 안읽은 알람 수
export const getUnreadCount = async (): Promise<number> => {
  const res = await axiosInstance.get('/api/notifications/unread-count');
  return res.data.unreadCount;
};
