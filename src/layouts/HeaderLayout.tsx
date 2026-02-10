import { Outlet } from 'react-router-dom';

import Header from '@/component/constants/Header';

const HeaderLayout = () => {
  return (
    /* h-full로 부모 높이를 다 채우고 flex-col로 배치 */
    <div className="flex flex-col h-full overflow-hidden">
      {/* 1. 헤더는 자기 높이만큼만 차지함 (shrink-0) */}
      <div className="shrink-0">
        <Header />
      </div>

      {/* 2. 여기가 핵심! flex-1로 '남은 공간'만 차지하고, 
          내용이 많아질 때만 이 안에서 스크롤이 생기게 함. */}
      <div className="flex-1 overflow-y-auto scroll min-h-0">
        <Outlet />
      </div>
    </div>
  );
};

export default HeaderLayout;
