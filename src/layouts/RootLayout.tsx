import { Outlet, useLocation } from 'react-router-dom';

import Header from '@/component/constants/Header';

const RootLayout = () => {
  const { pathname } = useLocation();

  // 헤더가 아예 없어야 하는 페이지 정의 (랜딩, 로그인)
  const isFullScreenPage = pathname === '/' || pathname.startsWith('/login');

  // 1. 랜딩이나 로그인일 때는 복잡한 구조 없이 본문만 꽉 차게!
  if (isFullScreenPage) {
    return (
      <div className="pageContainer h-dvh overflow-hidden">
        <Outlet />
      </div>
    );
  }

  // 2. 그 외 모든 서비스 페이지 (Dashboard, 상세페이지 등)
  return (
    <div className="pageContainer h-dvh overflow-hidden">
      <div className="scrollArea scroll h-full flex flex-col overflow-hidden">
        <div className="shrink-0 z-50">
          <Header />
        </div>

        <main className="mainSection flex-1 min-h-0 overflow-y-auto scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
