// src/router.tsx
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/layouts/RootLayout';
import DashboardMain from '@/pages/home/DashboardMain';
import LandingMain from '@/pages/home/LandingMain';
import Login from '@/pages/login/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <RootLayout />
      </Suspense>
    ),
    children: [
      // 서비스 첫 화면 (헤더 없는 랜딩/스플래시)
      {
        index: true,
        element: <LandingMain />,
      },
      //  로그인 페이지 (헤더 없음)
      {
        path: 'login',
        element: <Login />,
      },
      // 실제 메인 홈 (헤더 있는 대시보드)
      {
        path: 'home',
        element: <DashboardMain />,
      },
      // 4. 추후 늘어날 페이지들 (자동으로 헤더 붙음)
      {
        path: 'farm-detail/:id',
        element: <div>농장 상세 페이지</div>,
      },
    ],
  },
]);

export default router;
