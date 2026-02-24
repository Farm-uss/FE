import Footer from '@/component/constants/Footer';
import LoadingSpinner from '@/component/constants/LoadingSpinner';
import DashboardHeader from '@/component/home/DashboardHeader';
import FarmList from '@/component/home/FarmList';
import FarmSummary from '@/component/home/FarmSummary';
import { useFarmData } from '@/hooks/useFarmData';

const DashboardMain = () => {
  const { farms, summary, loading } = useFarmData();
  const nickname = localStorage.getItem('nickname') || '닉네임';

  if (loading) {
    return <LoadingSpinner message="농장 정보를 가져오고 있습니다!" />;
  }

  return (
    <div className="pageContainer bg-white h-dvh flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll flex flex-col">
        {/* 헤더 부분 */}
        <div className="shrink-0">
          <DashboardHeader nickname={nickname} />
        </div>

        {/* 메인 컨텐츠 영역 */}

        <div className="flex-1 px-6 pt-10 pb-10 shadow-report relative z-20 bg-white h-auto">
          <FarmSummary summary={summary} />
          <hr className="border-[#8B8880] mb-8" />
          <FarmList farms={farms} />

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
