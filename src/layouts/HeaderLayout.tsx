import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/component/constants/Header';
import Sidebar from '@/component/constants/Sidebar';

const HeaderLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const nickname = localStorage.getItem('nickname') || '동열';

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* 사이드바 배치 */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        nickname={nickname}
      />

      {/* 헤더에 열기 함수 전달 */}
      <div className="shrink-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
      </div>

      <div className="flex-1 overflow-y-auto scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default HeaderLayout;
