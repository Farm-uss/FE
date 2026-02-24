import { Outlet, useNavigate, useParams } from 'react-router-dom';

import CommonHeader from '@/component/constants/CommonHeader';
import FarmInfoSection from '@/component/farm/farmDetail/FarmInfoSection';
import FarmNavTab from '@/component/farm/farmDetail/FarmNavTab';
import { useFarmData } from '@/hooks/useFarmData';

const FarmDetailPage = () => {
  const navigate = useNavigate();
  const { farmId } = useParams();

  const { farms, loading, error } = useFarmData();

  // 1. 주소창 ID와 일치하는 농장 찾기
  const farmInfo = farms.find((f) => String(f.farmId) === farmId);

  // 로딩 중이거나 데이터를 찾지 못했을 때 예외 처리
  if (loading) return <div className="bg-[#F4F1EA] h-dvh" />;
  if (error || !farmInfo) {
    return (
      <div className="bg-[#F4F1EA] h-dvh flex items-center justify-center">
        <p className="text-[#20110A]/60">농장 정보를 찾을 수 없어!</p>
      </div>
    );
  }

  return (
    <div className="pageContainer bg-[#F4F1EA] h-dvh flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden scroll-none">
        <div className="flex-none px-6 pt-6">
          <CommonHeader
            title={farmInfo.name}
            onPrev={() => navigate('/home')}
          />
        </div>

        <div className="px-6 flex-none">
          <FarmInfoSection
            crop={farmInfo.crops[0] || '작물 정보 없음'}
            location={farmInfo.location}
            area="1m²" // 이거 나중에 수정 해야함
            memberCount={farmInfo.memberCount}
            ownerName={farmInfo.ownerName}
          />
        </div>

        <div className="px-6 flex-none">
          <FarmNavTab />
        </div>

        <main className="flex-1 flex flex-col mt-10">
          <Outlet context={{ farmInfo }} />
        </main>
      </div>
    </div>
  );
};

export default FarmDetailPage;
