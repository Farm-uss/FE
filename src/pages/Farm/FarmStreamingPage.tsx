import { Icon } from '@iconify/react'; // ✨ 아이콘 컴포넌트 추가

import Footer from '@/component/constants/Footer';
import BottomSheetHeader from '@/component/farm/farmDetail/BottomSheetHeader';

const FarmStreamingPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center bg-[#E6E0D3]/50 rounded-t-[30px] py-6 px-10 w-full gap-5">
      <BottomSheetHeader
        title={'카메라 스트리밍'}
        description="실시간으로 내 농장을 확인하세요!"
      />

      <div className="bg-white w-full h-[270px] rounded-2xl flex items-center justify-center shadow-inner">
        <Icon
          icon="material-symbols:photo-camera-rounded"
          className="text-[150px] text-[#20110A]/20" // 크기는 64px, 색상은 연하게 처리
        />
      </div>

      <div className="text-center mt-2">
        <p className="text-c-12m text-[#20110A]/40">
          카메라 연결 상태를 확인 중입니다...
        </p>
      </div>
      <div className="w-full flex justify-between items-center pt-10">
        <button className="w-[120px] h-[45px] text-b-14b bg-white border border-[#8B8880] rounded-3xl">
          해상도
        </button>
        <button className="w-[120px] h-[45px] text-b-14b bg-black text-white border border-[#8B8880] rounded-3xl">
          캡처하기
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default FarmStreamingPage;
