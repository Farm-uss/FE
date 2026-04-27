// src/routes/router.tsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import LoadingSpinner from '@/component/constants/LoadingSpinner';
import RootLayout from '@/layouts/RootLayout';

const ChatBot = lazy(() => import('@/pages/chatBot/ChatBot'));
const FarmAddPage = lazy(() => import('@/pages/Farm/FarmAddPage'));
const FarmDashboard = lazy(() => import('@/pages/Farm/FarmDashboard'));
const FarmDetailPage = lazy(() => import('@/pages/Farm/FarmDetailPage'));
const FarmStreamingPage = lazy(() => import('@/pages/Farm/FarmStreamingPage'));
const GrowthDiary = lazy(() => import('@/pages/Farm/GrowthDiary'));
const GrowthTraking = lazy(() => import('@/pages/Farm/GrowthTraking'));
const ManageFriendsPage = lazy(() => import('@/pages/Farm/ManageFriendsPage'));
const PestDetection = lazy(() => import('@/pages/Farm/PestDetection'));
const Register = lazy(() => import('@/pages/Farm/Register'));
const Schedule = lazy(() => import('@/pages/Farm/Schedule'));
const DashboardMain = lazy(() => import('@/pages/home/DashboardMain'));
const LandingMain = lazy(() => import('@/pages/home/LandingMain'));
const Login = lazy(() => import('@/pages/login/Login'));
const ManageFarmsPage = lazy(() => import('@/pages/manage/manage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <RootLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <LandingMain /> },
      { path: 'login', element: <Login /> },
      { path: 'home', element: <DashboardMain /> },
      { path: 'farm-add', element: <FarmAddPage /> },

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
      { path: 'chatBot', element: <ChatBot /> },
    ],
  },
]);

export default router;
