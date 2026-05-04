import { useNavigate } from 'react-router-dom';

import { readNotification } from '@/apis/notificationService';
import alaramIcon from '@/assets/icons/common/alarmIcon.svg';
import type { NotificationItem as NotificationItemType } from '@/types/notification';

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${mm}.${dd} ${hh}:${min}`;
};

interface Props {
  noti: NotificationItemType;
  onRead?: (id: number) => void;
}

const NotificationItem = ({ noti, onRead }: Props) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      if (!noti.read) {
        await readNotification(noti.id);
        onRead?.(noti.id);
      }
      navigate(`/farm/${noti.farmId}`);
    } catch {
      navigate(`/farm/${noti.farmId}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`px-4 py-3 border-b border-[#F0EDE8] last:border-none transition-colors cursor-pointer active:bg-[#EDE8DF] ${
        !noti.read ? 'bg-[#F5F2EC]' : 'bg-white'
      }`}
    >
      <div className="flex items-start gap-3">
        <img
          src={alaramIcon}
          alt="알림"
          className={`w-10 h-10 shrink-0 ${!noti.read ? 'opacity-100' : 'opacity-40'}`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p
              className={`text-c-12b font-bold truncate ${!noti.read ? 'text-[#20110A]' : 'text-[#20110A]/40'}`}
            >
              {noti.typeDescription}
            </p>
            {!noti.read && (
              <div className="w-2 h-2 bg-red-500 rounded-full shrink-0" />
            )}
          </div>
          <p
            className={`text-c-10m mt-0.5 line-clamp-2 ${!noti.read ? 'text-[#20110A]/60' : 'text-[#20110A]/30'}`}
          >
            {noti.message}
          </p>
          <p
            className={`text-[10px] mt-1 ${!noti.read ? 'text-[#20110A]/40' : 'text-[#20110A]/20'}`}
          >
            {formatDate(noti.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
