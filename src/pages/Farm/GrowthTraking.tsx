import Footer from '@/component/constants/Footer';
import BottomSheetHeader from '@/component/farm/farmDetail/BottomSheetHeader';
import GrowthChartSection from '@/component/farm/growthTraking/GrowthChartSection.tsx';
import GrowthDegreeSection from '@/component/farm/growthTraking/GrowthDegreeSection';

const GrowthTracking = () => {
  return (
    <div className="flex-1 flex flex-col items-center bg-[#E6E0D3]/50 rounded-t-[30px] py-6 px-9 w-full gap-6 scroll">
      <BottomSheetHeader
        title="성장 추적"
        description="실시간으로 내 농장을 확인하세요!"
      />

      {/* --- 섹션별 분리 ----*/}
      <GrowthChartSection />
      <GrowthDegreeSection farmId={38} cropsId={22} />

      <Footer />
    </div>
  );
};

export default GrowthTracking;
