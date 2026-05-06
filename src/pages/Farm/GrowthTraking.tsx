import { useOutletContext } from 'react-router-dom';

import Footer from '@/component/constants/Footer';
import BottomSheetHeader from '@/component/farm/farmDetail/BottomSheetHeader';
import GrowthChartSection from '@/component/farm/growthTraking/GrowthChartSection.tsx';
import GrowthDegreeSection from '@/component/farm/growthTraking/GrowthDegreeSection';

export interface FarmDetailContext {
  farmInfo: {
    farmId: number;
    cropsId: number;
    deviceId: number;
  };
}

const GrowthTracking = () => {
  // Outlet context에서 farmInfo 꺼내오기
  const { farmInfo } = useOutletContext<FarmDetailContext>();

  const farmId = farmInfo.farmId;
  const cropsId = farmInfo.cropsId;

  return (
    <div className="flex-1 flex flex-col items-center bg-[#E6E0D3]/50 rounded-t-[30px] py-6 px-9 w-full gap-6 scroll">
      <BottomSheetHeader
        title="성장 추적"
        description="실시간으로 내 농장을 확인하세요!"
      />

      {/* --- 섹션별 분리 ----*/}
      <GrowthChartSection farmId={farmId} cropsId={cropsId} />

      {/*  실제 ID 넘기기! */}
      <GrowthDegreeSection farmId={farmId} cropsId={cropsId} />

      <Footer />
    </div>
  );
};

export default GrowthTracking;
