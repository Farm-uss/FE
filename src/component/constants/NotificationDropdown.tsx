import { useNavigate } from 'react-router-dom';

import type { Notification } from '@/types/notification';

import NotificationItem from './NotificationItem';

interface Props {
  notifications: Notification[];
  onReadAll: () => void;
  onClose: () => void;
}

const NotificationDropdown = ({ notifications, onReadAll, onClose }: Props) => {
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="fixed right-3 top-[55px] w-[280px] bg-white rounded-[20px] shadow-xl z-50 overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0EDE8]">
        <span className="text-b-14b text-[#20110A] font-bold">알림</span>
        {unreadCount > 0 && (
          <button onClick={onReadAll} className="text-c-10m text-[#20110A]/50">
            모두 읽음
          </button>
        )}
      </div>

      {/* 알림 목록 */}
      <div className="flex flex-col">
        {notifications.slice(0, 5).map((noti) => (
          <NotificationItem key={noti.id} noti={noti} />
        ))}
      </div>

      {/* 전체보기 */}
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
