import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '@/apis/axios';
import { readNotification } from '@/apis/notificationService';
import alaramIcon from '@/assets/icons/common/alarmIcon.svg';
import LoadingSpinner from '@/component/constants/LoadingSpinner';
import { useNotifications } from '@/hooks/useNotifications';

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${mm}.${dd} ${hh}:${min}`;
};

const NotificationPage = () => {
  const navigate = useNavigate();
  const {
    notifications,
    loading,
    isLast,
    loadMore,
    markAsRead,
    markAllAsRead,
  } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleTestPush = async () => {
    await axiosInstance.post('/api/push/test').catch(() => {});
  };

  return (
    <div className="pageContainer bg-white flex flex-col">
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
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-c-12m text-[#20110A]/40 active:scale-90 transition-transform"
            >
              모두 읽음
            </button>
          )}
          <button
            onClick={handleTestPush}
            className="text-c-12m text-[#648E2E] active:scale-90 transition-transform"
          >
            테스트 푸시
          </button>
        </div>
      </div>

      {/* 목록 */}
      <div className="flex-1 overflow-y-auto scroll">
        {loading && notifications.length === 0 ? (
          <LoadingSpinner message="알림 불러오는 중..." />
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 py-20">
            <Icon
              icon="material-symbols:notifications-off-outline"
              className="text-[60px] text-[#20110A]/20"
            />
            <p className="text-b-14b text-[#20110A]/40">알림이 없습니다</p>
          </div>
        ) : (
          <>
            {notifications.map((noti) => (
              <div
                key={noti.id}
                onClick={async () => {
                  if (!noti.read) {
                    await readNotification(noti.id).catch(() => {});
                    markAsRead(noti.id);
                    window.dispatchEvent(new Event('notification-read'));
                  }
                  navigate(`/farm/${noti.farmId}`);
                }}
                className={`flex items-start gap-4 px-5 py-5 border-b border-[#F5F5F5] cursor-pointer active:bg-[#EDE8DF] ${
                  !noti.read ? 'bg-[#F5F2EC]' : 'bg-white'
                }`}
              >
                <img
                  src={alaramIcon}
                  alt="알림"
                  className={`w-14 h-14 shrink-0 ${!noti.read ? 'opacity-100' : 'opacity-30'}`}
                />
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[15px] font-bold ${!noti.read ? 'text-[#20110A]' : 'text-[#20110A]/40'}`}
                      >
                        {noti.typeDescription}
                      </span>
                      {!noti.read && (
                        <div className="w-2 h-2 bg-red-500 rounded-full shrink-0" />
                      )}
                    </div>
                    <span className="text-[12px] text-[#20110A]/30 shrink-0">
                      {formatDate(noti.createdAt)}
                    </span>
                  </div>
                  <p
                    className={`text-[14px] leading-relaxed ${!noti.read ? 'text-[#20110A]/70' : 'text-[#20110A]/30'}`}
                  >
                    {noti.message}
                  </p>
                </div>
              </div>
            ))}

            {!isLast && (
              <button
                onClick={loadMore}
                disabled={loading}
                className="w-full py-4 text-b-14m text-[#20110A]/50 active:bg-[#F5F2EC] transition-colors"
              >
                {loading ? '불러오는 중...' : '더 보기'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
