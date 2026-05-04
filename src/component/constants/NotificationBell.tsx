import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';

import { getNotifications, getUnreadCount } from '@/apis/notificationService';
import type { NotificationItem } from '@/types/notification';

import NotificationDropdown from './NotificationDropdown';

const NotificationBell = () => {
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([getNotifications(0, 5), getUnreadCount()])
      .then(([notiRes, unread]) => {
        setNotifications(notiRes.content);
        setUnreadCount(unread);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsNotiOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handler = () => {
      getUnreadCount()
        .then(setUnreadCount)
        .catch(() => {});
    };
    window.addEventListener('notification-read', handler);
    return () => window.removeEventListener('notification-read', handler);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsNotiOpen((prev) => !prev)}
        className="p-2 active:scale-90 transition-transform relative"
      >
        <Icon
          icon="material-symbols:notifications-outline-rounded"
          className="text-[28px] text-[#20110A]"
        />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-[16px] h-[16px] bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {isNotiOpen && (
        <NotificationDropdown
          notifications={notifications}
          unreadCount={unreadCount}
          onClose={() => setIsNotiOpen(false)}
        />
      )}
    </div>
  );
};

export default NotificationBell;
