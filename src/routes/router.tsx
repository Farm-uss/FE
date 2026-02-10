// src/router.tsx
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/layouts/RootLayout';
import Home from '@/pages/home/Home';
import Login from '@/pages/login/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense>
        <RootLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
