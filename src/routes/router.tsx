// src/router.tsx
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/layouts/RootLayout';
import FarmAddPage from '@/pages/Farm/FarmAddPage';
import FarmDashboard from '@/pages/Farm/FarmDashboard';
import FarmDetailPage from '@/pages/Farm/FarmDetailPage';
import FarmStreamingPage from '@/pages/Farm/FarmStreamingPage';
import GrowthDiary from '@/pages/Farm/GrowthDiary';
import GrowthTraking from '@/pages/Farm/GrowthTraking';
import ManageFriendsPage from '@/pages/Farm/ManageFriendsPage';
import PestDetection from '@/pages/Farm/PestDetection';
import Register from '@/pages/Farm/Register';
import Schedule from '@/pages/Farm/Schedule';
import DashboardMain from '@/pages/home/DashboardMain';
import LandingMain from '@/pages/home/LandingMain';
import Login from '@/pages/login/Login';
import ManageFarmsPage from '@/pages/manage/manage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <RootLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <LandingMain /> },
      { path: 'login', element: <Login /> },
      { path: 'home', element: <DashboardMain /> },
      { path: 'farm-add', element: <FarmAddPage /> },

      /* 1. 기존 농장 상세 (탭 메뉴 있음) */
      {
        path: 'farm/:farmId',
        element: <FarmDetailPage />,
        children: [
          { index: true, element: <FarmDashboard /> },
          { path: 'streaming', element: <FarmStreamingPage /> },
          { path: 'growthTraking', element: <GrowthTraking /> },
          { path: 'pestDetection', element: <PestDetection /> },
          { path: 'growthDiary', element: <GrowthDiary /> },
          { path: 'schedule', element: <Schedule /> },
          { path: 'device-register', element: <Register /> },
        ],
      },

      {
        path: 'farm/:farmId/manage-friends',
        element: <ManageFriendsPage />,
      },

      { path: 'manage', element: <ManageFarmsPage /> },
    ],
  },
]);
export default router;
