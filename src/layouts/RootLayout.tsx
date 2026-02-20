import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '@/component/constants/Header';
import Sidebar from '@/component/constants/Sidebar';

const RootLayout = () => {
  const { pathname } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const nickname = localStorage.getItem('nickname') || '닉네임';

  const isFullScreenPage = pathname === '/' || pathname.startsWith('/login');

  if (isFullScreenPage) {
    return (
      <div className="pageContainer h-dvh overflow-hidden mx-auto max-w-[430px] shadow-2xl bg-white">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="pageContainer h-dvh overflow-hidden relative mx-auto max-w-[430px] shadow-2xl bg-white">
      <div className="scrollArea h-full flex flex-col">
        {/* 헤더 */}
        <div className="shrink-0 z-50 bg-white">
          <Header onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />
        </div>

        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          nickname={nickname}
        />

        {/* 본문 영역 */}
        <main className="mainSection flex-1 min-h-0 overflow-y-auto scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
