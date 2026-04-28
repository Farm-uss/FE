import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '@/component/constants/Header';
import Sidebar from '@/component/constants/Sidebar';
import { storage } from '@/utils/storage';

const RootLayout = () => {
  const { pathname } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isSidebarOpenRef = useRef(isSidebarOpen);
  const nickname = storage.getNickname() || '닉네임';

  const isFullScreenPage = pathname === '/' || pathname.startsWith('/login');

  // isSidebarOpen 상태가 바뀔 때마다 ref 동기화 (stale closure 방지)
  useEffect(() => {
    isSidebarOpenRef.current = isSidebarOpen;
  }, [isSidebarOpen]);

  // 네이티브 window 터치 이벤트로 스와이프 감지
  useEffect(() => {
    if (isFullScreenPage) return;

    let startX = 0;
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const diffX = startX - e.changedTouches[0].clientX;
      const diffY = startY - e.changedTouches[0].clientY;
      if (Math.abs(diffY) > Math.abs(diffX)) return;
      if (Math.abs(diffX) < 50) return;

      // 오른쪽 끝 30px 안에서 시작 + 왼쪽으로 스와이프 → 열기
      if (
        diffX > 0 &&
        !isSidebarOpenRef.current &&
        startX > window.innerWidth - 50
      ) {
        setIsSidebarOpen(true);
      }

      // 사이드바 열린 상태에서 오른쪽으로 스와이프 → 닫기
      if (diffX < 0 && isSidebarOpenRef.current) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isFullScreenPage]);

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
        <div className="shrink-0 z-50 bg-white">
          <Header onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />
        </div>

        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          nickname={nickname}
        />

        <main className="mainSection flex-1 min-h-0 overflow-y-auto scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
