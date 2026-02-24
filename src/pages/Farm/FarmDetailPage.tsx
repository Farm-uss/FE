import { Outlet, useNavigate } from 'react-router-dom';

import CommonHeader from '@/component/constants/CommonHeader';
import FarmInfoSection from '@/component/farm/farmDetail/FarmInfoSection';
import FarmNavTab from '@/component/farm/farmDetail/FarmNavTab';

const FarmDetailPage = () => {
  const navigate = useNavigate();

  //mock Data
  const farmInfo = {
    name: '동열이네 농장',
    crop: '상추',
    location: '한성대학교',
    area: '1m²',
    memberCount: 4,
  };

  return (
    <div className="pageContainer bg-[#F4F1EA] flex flex-col h-full overflow-hidden">
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        <CommonHeader title={farmInfo.name} onPrev={() => navigate('/home')} />

        {/*정보 섹션 */}
        <FarmInfoSection
          crop={farmInfo.crop}
          location={farmInfo.location}
          area={farmInfo.area}
          memberCount={farmInfo.memberCount}
        />

        {/*네비게이션 탭 */}
        <FarmNavTab />

        <main className="flex-1 overflow-y-auto pb-6 scroll-none">
          <Outlet />
        </main>

        <footer className="py-6 text-center text-c-10m text-[#20110A]/40 uppercase tracking-widest font-medium shrink-0">
          Smart FARM, Smart US.
        </footer>
      </div>
    </div>
  );
};

export default FarmDetailPage;
