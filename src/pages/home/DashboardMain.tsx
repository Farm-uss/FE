import DashboardHeader from '@/component/home/DashboardHeader';
import FarmList from '@/component/home/FarmList'; // 농장 리스트 부분도 분리했다고 가정!
import FarmSummary from '@/component/home/FarmSummary';
import { useFarmData } from '@/hooks/useFarmData';

const DashboardMain = () => {
  const { farms, summary, loading } = useFarmData();
  const nickname = localStorage.getItem('nickname') || '동열';

  if (loading)
    return <div className="loading-style">데이터 불러오는 중...</div>;

  return (
    <div className="flex flex-col h-full bg-white">
      <DashboardHeader nickname={nickname} />

      {/* 하단 화이트 영역 */}
      <div className="flex-1 px-6 pt-10 pb-10 shadow-report relative z-20 bg-white">
        <FarmSummary summary={summary} />
        <hr className="border-[#8B8880] mb-8" />
        <FarmList farms={farms} />

        <div className="mt-16 pb-4 text-center">
          <p className="text-c-12m text-gray-300 tracking-widest">
            Smart FARM, Smart US.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
