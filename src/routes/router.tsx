import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/layouts/RootLayout';
import Home from '@/pages/Home';

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
    ],
  },
]);

export default router;
