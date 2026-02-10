// src/pages/home/Home.tsx
import { useState } from 'react';

import Header from '@/component/constants/Header';

import DashboardMain from './DashboardMain';
import LandingMain from './LandingMain';

const Home = () => {
  const [isLoggedIn] = useState(true);

  return (
    <>
      {isLoggedIn ? (
        /* 전체 높이를 부모(RootLayout)에 맞게 꽉 채우고(h-full),
          
        */
        <div className="flex flex-col h-full overflow-hidden">
          <div className="shrink-0 z-50">
            <Header />
          </div>

          {/* 2. 대시보드가 '남은 공간'을 다 차지하고, 
              필요할 때만 이 안에서 스크롤이 생기도록 설정! */}
          <div className="flex-1 overflow-y-auto scroll">
            <DashboardMain />
          </div>
        </div>
      ) : (
        <LandingMain />
      )}
    </>
  );
};

export default Home;
