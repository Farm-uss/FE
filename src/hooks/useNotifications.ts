import { useCallback, useEffect, useRef, useState } from 'react';

import {
  getNotifications,
  readAllNotifications,
} from '@/apis/notificationService';
import type { NotificationItem } from '@/types/notification';

const POLL_INTERVAL = 30_000;

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const errorCountRef = useRef(0); // ← 추가

  const fetchNotifications = useCallback(async (pageNum: number) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await getNotifications(pageNum);
      errorCountRef.current = 0; // 성공 시 초기화

      setNotifications((prev) => {
        if (pageNum === 0) return res.content;
        const existingIds = new Set(prev.map((n) => n.id));
        const newItems = res.content.filter((n) => !existingIds.has(n.id));
        return [...prev, ...newItems];
      });

      setIsLast(res.last);
    } catch (e) {
      errorCountRef.current += 1; // 실패 시 카운트 증가
      console.error('알림 불러오기 실패:', e);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications(0);
  }, [fetchNotifications]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (errorCountRef.current >= 3) return; // 연속 3회 실패 시 스킵
      setPage(0);
      fetchNotifications(0);
    }, POLL_INTERVAL);
    return () => clearInterval(timer);
  }, [fetchNotifications]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        errorCountRef.current = 0; // 화면 복귀 시 에러 카운트 초기화
        setPage(0);
        fetchNotifications(0);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibility);
  }, [fetchNotifications]);

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchNotifications(next);
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = async () => {
    await readAllNotifications();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    window.dispatchEvent(new Event('notification-read'));
  };

  return {
    notifications,
    loading,
    isLast,
    loadMore,
    markAsRead,
    markAllAsRead,
  };
};
