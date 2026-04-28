// components/common/Sidebar.tsx
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CommonModal from '@/component/constants/CommonModal';
import { storage } from '@/utils/storage';

import sidebarImg from '../../assets/image/gnb/rightGnbImg.svg';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  nickname: string;
}

const Sidebar = ({ isOpen, onClose, nickname }: Props) => {
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleMenuClick = (path: string, label: string) => {
    if (label === '로그아웃') {
      setLogoutModalOpen(true); // window.confirm 대신 모달 열기
      return;
    }
    navigate(path);
    onClose();
  };

  const handleLogoutConfirm = () => {
    storage.clearAuth();
    setLogoutModalOpen(false);
    onClose();
    navigate('/login');
  };

  return (
    <>
      {/* 배경 */}
      <div
        className={`absolute top-[52px] left-0 right-0 bottom-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* 사이드바 */}
      <aside
        className={`absolute top-[52px] right-0 h-[calc(100%-52px)] w-[70%] bg-white z-45 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full border-l border-[#E6E0D3] relative overflow-hidden">
          <div className="p-6 flex-1 flex flex-col z-10">
            <div className="mb-10 pt-4 px-2">
              <h2 className="text-h-18b text-[#20110A] font-bold">
                {nickname} 님,
              </h2>
              <p className="text-c-12m text-gray-500 mt-1 font-medium">
                오늘 농장은 어떤가요?
              </p>
            </div>

            <nav className="space-y-4 overflow-y-auto scrollbar-hide px-2">
              {[
                {
                  icon: 'material-symbols:potted-plant-outline',
                  label: '내 농장 관리',
                  path: '/manage',
                },
                {
                  icon: 'material-symbols:person-outline',
                  label: '마이페이지',
                  path: '/mypage',
                },
                {
                  icon: 'material-symbols:smart-toy-outline',
                  label: 'AI챗봇',
                  path: '/chatBot',
                },
                {
                  icon: 'material-symbols:settings-outline',
                  label: '설정',
                  path: '/setting',
                },
                {
                  icon: 'material-symbols:logout-rounded',
                  label: '로그아웃',
                  path: '/login',
                },
                {
                  icon: 'material-symbols:person-remove-outline',
                  label: '회원탈퇴',
                  path: '/withdraw',
                },
              ].map((menu, idx) => (
                <div
                  key={idx}
                  onClick={() => handleMenuClick(menu.path, menu.label)}
                  className={`flex items-center gap-4 p-4 rounded-2xl bg-[#E8E2D5] cursor-pointer transition-all active:scale-95 ${
                    menu.label === '회원탈퇴'
                      ? 'text-gray-400 opacity-70'
                      : 'text-[#20110A]'
                  }`}
                >
                  <Icon icon={menu.icon} className="text-[22px]" />
                  <span className="text-b-14m font-semibold">{menu.label}</span>
                </div>
              ))}
            </nav>
          </div>

          <div className="shrink-0 w-full mt-auto pointer-events-none">
            <img
              src={sidebarImg}
              alt=""
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </aside>

      {/* 로그아웃 확인 모달 */}
      <CommonModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        title="로그아웃 하시겠어요?"
        buttonText="로그아웃"
        showCancel
        cancelText="취소"
      />
    </>
  );
};

export default Sidebar;
