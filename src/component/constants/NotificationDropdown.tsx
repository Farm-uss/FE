import { useNavigate } from 'react-router-dom';

import type { NotificationItem } from '@/types/notification';

import NotificationItemComponent from './NotificationItem';

interface Props {
  notifications: NotificationItem[];
  unreadCount: number;
  onClose: () => void;
}

const NotificationDropdown = ({
  notifications,
  unreadCount,
  onClose,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="fixed right-3 top-[55px] w-[280px] bg-white rounded-[20px] shadow-xl z-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0EDE8]">
        <span className="text-b-14b text-[#20110A] font-bold">알림</span>
        {unreadCount > 0 && (
          <span className="text-c-10m text-[#E05C2A] font-bold">
            안읽음 {unreadCount}개
          </span>
        )}
      </div>

      <div className="flex flex-col">
        {notifications.length === 0 ? (
          <p className="text-center text-c-12m text-[#20110A]/40 py-6">
            알림이 없습니다
          </p>
        ) : (
          notifications
            .slice(0, 5)
            .map((noti) => (
              <NotificationItemComponent key={noti.id} noti={noti} />
            ))
        )}
      </div>

      <button
        onClick={() => {
          navigate('/notifications');
          onClose();
        }}
        className="w-full py-3 text-c-12b text-[#20110A]/60 hover:bg-[#F5F2EC] transition-colors"
      >
        전체보기
      </button>
    </div>
  );
};

export default NotificationDropdown;
