// src/router.tsx
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/layouts/RootLayout';
import FarmAddPage from '@/pages/Farm/FarmAddPage';
import FarmDashboard from '@/pages/Farm/FarmDashboard';
import FarmDetailPage from '@/pages/Farm/FarmDetailPage';
import FarmStreamingPage from '@/pages/Farm/FarmStreamingPage';
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
        path: 'farm-add',
        element: <FarmAddPage />,
      },
      {
        path: 'farm/:farmId',
        element: <FarmDetailPage />, // 상단 정보 + 탭 메뉴가 포함된 레이아웃
        children: [
          {
            index: true, // /farm/23 접속 시 기본으로 보여줄 화면
            element: <FarmDashboard />,
          },
          {
            path: 'streaming', // /farm/23/photos
            element: <FarmStreamingPage />,
          },
          {
            path: 'analysis', // /farm/23/analysis
            element: <div>통계 분석 페이지 (준비중)</div>,
          },
          // ... 나머지 메뉴 아이콘들에 대응하는 라우트들 추가
        ],
      },
    ],
  },
]);

export default router;
