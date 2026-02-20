import LoadingSpinner from '@/component/constants/LoadingSpinner';
import DashboardHeader from '@/component/home/DashboardHeader';
import FarmList from '@/component/home/FarmList'; // 농장 리스트 부분도 분리했다고 가정!
import FarmSummary from '@/component/home/FarmSummary';
import { useFarmData } from '@/hooks/useFarmData';

const DashboardMain = () => {
  const { farms, summary, loading } = useFarmData();
  const nickname = localStorage.getItem('nickname') || '닉네임';

  if (loading) {
    return <LoadingSpinner message="농장 정보를 가져오고 있습니다!" />;
  }
  return (
    <div className="pageContainer bg-white">
      {/* 1. 헤더는 자기 높이 유지 */}
      <div className="shrink-0">
        <DashboardHeader nickname={nickname} />
      </div>

      {/* 2. 하단 영역: 여기가 핵심! */}
      <div className="flex-1 px-6 pt-10 pb-10 shadow-report relative z-20 bg-white overflow-y-auto scrollbar-hide">
        {/* flex-1이 남은 공간을 다 먹고, 내용이 많아지면 여기서만 스크롤이 생겨 */}
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
