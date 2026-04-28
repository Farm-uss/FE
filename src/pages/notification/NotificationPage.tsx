import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import alaramIcon from '@/assets/icons/common/alarmIcon.svg';
import type { Notification } from '@/types/notification';

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
  {
    id: 6,
    title: '병해충 감지',
    message: '토마토 농장에서 역병이 감지되었습니다.',
    createdAt: '3일 전',
    isRead: true,
  },
  {
    id: 7,
    title: 'GDD 알림',
    message: '딸기 농장의 누적 GDD가 300을 넘었습니다.',
    createdAt: '4일 전',
    isRead: true,
  },
];

const NotificationPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] =
    useState<Notification[]>(DUMMY_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleReadAll = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="pageContainer bg-white flex flex-col">
      {/* 헤더 — 화살표 + 알림 같은 줄 */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="active:scale-90 transition-transform"
          >
            <Icon
              icon="material-symbols:arrow-back-rounded"
              className="text-[26px] text-[#20110A]"
            />
          </button>
          <h1 className="text-[24px] font-bold text-[#20110A]">알림</h1>
        </div>
        {unreadCount > 0 ? (
          <button
            onClick={handleReadAll}
            className="text-c-12m text-[#20110A]/40"
          >
            모두 읽음
          </button>
        ) : (
          <div className="w-[56px]" />
        )}
      </div>

      {/* 알림 목록 */}
      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 py-20">
            <Icon
              icon="material-symbols:notifications-off-outline"
              className="text-[60px] text-[#20110A]/20"
            />
            <p className="text-b-14b text-[#20110A]/40">알림이 없습니다</p>
          </div>
        ) : (
          notifications.map((noti) => (
            <div
              key={noti.id}
              className={`flex items-start gap-4 px-5 py-5 border-b border-[#F5F5F5] ${
                !noti.isRead ? 'bg-[#F5F2EC]' : 'bg-white'
              }`}
            >
              {/* 아이콘 — 크게 */}
              <img
                src={alaramIcon}
                alt="알림"
                className={`w-14 h-14 shrink-0 ${!noti.isRead ? 'opacity-100' : 'opacity-30'}`}
              />

              {/* 내용 */}
              <div className="flex-1 min-w-0 py-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[15px] font-bold ${!noti.isRead ? 'text-[#20110A]' : 'text-[#20110A]/40'}`}
                    >
                      {noti.title}
                    </span>
                    {!noti.isRead && (
                      <div className="w-2 h-2 bg-red-500 rounded-full shrink-0" />
                    )}
                  </div>
                  <span className="text-[12px] text-[#20110A]/30 shrink-0">
                    {noti.createdAt}
                  </span>
                </div>
                <p
                  className={`text-[14px] leading-relaxed ${!noti.isRead ? 'text-[#20110A]/70' : 'text-[#20110A]/30'}`}
                >
                  {noti.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
