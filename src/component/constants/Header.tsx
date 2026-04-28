import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import type { Notification } from '@/types/notification';
import { storage } from '@/utils/storage';

import HeaderIcon from '../../assets/icons/common/HedartIcon.svg';
import NotificationDropdown from './NotificationDropdown';

const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    title: '병해충 감지',
    message: '고추 농장에서 잎마름병이 감지되었습니다.',
    createdAt: '2분 전',
    isRead: false,
  },
  {
    id: 2,
    title: 'GDD 알림',
    message: '토마토 농장의 누적 GDD가 500을 넘었습니다.',
    createdAt: '1시간 전',
    isRead: false,
  },
  {
    id: 3,
    title: '센서 이상',
    message: '딸기 농장 온도 센서 데이터가 없습니다.',
    createdAt: '3시간 전',
    isRead: true,
  },
  {
    id: 4,
    title: '수확 예정',
    message: '고추 농장 예상 수확일이 7일 남았습니다.',
    createdAt: '1일 전',
    isRead: true,
  },
  {
    id: 5,
    title: '친구 추가',
    message: '홍길동님이 농장 멤버로 참여했습니다.',
    createdAt: '2일 전',
    isRead: true,
  },
];

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!storage.getAccessToken();
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(DUMMY_NOTIFICATIONS);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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

  return (
    <div className="w-full h-[52px] bg-[#E8E2D5] flex items-center justify-between px-6 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
      <Link to={isLoggedIn ? '/home' : '/'}>
        <img src={HeaderIcon} alt="header-icon" className="w-auto h-auto" />
      </Link>

      <div className="flex items-center gap-1">
        {isLoggedIn ? (
          <>
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
                  onReadAll={() =>
                    setNotifications((prev) =>
                      prev.map((n) => ({ ...n, isRead: true })),
                    )
                  }
                  onClose={() => setIsNotiOpen(false)}
                />
              )}
            </div>

            <button
              onClick={onMenuClick}
              className="p-2 -mr-2 active:scale-90 transition-transform"
            >
              <Icon
                icon="material-symbols:menu-rounded"
                className="text-[28px] text-[#20110A]"
              />
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="text-c-10m text-[#20110A] bg-white rounded-2xl transition-opacity"
          >
            로그인
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
