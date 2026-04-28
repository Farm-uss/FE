import type { Notification } from '@/types/notification';

import alaramIcon from '../../assets/icons/common/alarmIcon.svg';

const NotificationItem = ({ noti }: { noti: Notification }) => (
  <div
    className={`px-4 py-3 border-b border-[#F0EDE8] last:border-none transition-colors ${
      !noti.isRead ? 'bg-[#F5F2EC]' : 'bg-white'
    }`}
  >
    <div className="flex items-start gap-3">
      {/* 아이콘 — 읽은 알림은 흐리게 */}
      <img
        src={alaramIcon}
        alt="알림"
        className={`w-10 h-10 shrink-0 transition-opacity ${!noti.isRead ? 'opacity-100' : 'opacity-40'}`}
      />

      {/* 내용 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p
            className={`text-c-12b font-bold truncate ${!noti.isRead ? 'text-[#20110A]' : 'text-[#20110A]/40'}`}
          >
            {noti.title}
          </p>
          {!noti.isRead && (
            <div className="w-2 h-2 bg-red-500 rounded-full shrink-0" />
          )}
        </div>
        <p
          className={`text-c-10m mt-0.5 line-clamp-2 ${!noti.isRead ? 'text-[#20110A]/60' : 'text-[#20110A]/30'}`}
        >
          {noti.message}
        </p>
        <p
          className={`text-[10px] mt-1 ${!noti.isRead ? 'text-[#20110A]/40' : 'text-[#20110A]/20'}`}
        >
          {noti.createdAt}
        </p>
      </div>
    </div>
  </div>
);

export default NotificationItem;
