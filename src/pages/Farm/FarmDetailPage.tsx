import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

import CommonHeader from '@/component/constants/CommonHeader';
import LoadingSpinner from '@/component/constants/LoadingSpinner';
import FarmInfoSection from '@/component/farm/farmDetail/FarmInfoSection';
import FarmNavTab from '@/component/farm/farmDetail/FarmNavTab';
import { useFarmData } from '@/hooks/useFarmData';

const FarmDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 추가
  const { farmId } = useParams();
  const { farms, loading, error } = useFarmData();
  const farmInfo = farms.find((f) => String(f.farmId) === farmId);

  // 현재 경로가 기기 등록 페이지인지 확인하는 변수
  const isRegisterPage = location.pathname.includes('device-register'); // 변경

  useEffect(() => {
    if (!loading && farmInfo && farmInfo.isDeviceRegistered === false) {
      if (!isRegisterPage) {
        navigate(`/farm/${farmId}/device-register`, { replace: true });
      }
    }
  }, [loading, farmInfo, farmId, navigate, isRegisterPage]);

  if (loading)
    return <LoadingSpinner message="농장 정보를 가져오고 있습니다!" />;

  if (error || !farmInfo) {
    return (
      <div className="bg-[#F4F1EA] h-dvh flex items-center justify-center">
        <p className="text-[#20110A]/60">농장 정보를 찾을 수 없어!</p>
      </div>
    );
  }

  if (farmInfo.isDeviceRegistered === false && !isRegisterPage) {
    return <LoadingSpinner message="기기 등록이 필요합니다..." />;
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
            farmId={farmInfo.farmId}
            crop={farmInfo.crops[0] || '작물 정보 없음'}
            location={farmInfo.location}
            area={farmInfo.area ? `${farmInfo.area}m²` : '1m²'}
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
