import { Icon } from '@iconify/react';

import FarmCard from '@/component/home/FarmCard';

import mainImg2 from '../../../public/img/MainImg2.svg';

// 농장 데이터 리스트 타입 정의
interface FarmData {
  id: number;
  name: string;
  ownerName: string;
  extraMemberCount: number;
  location: string;
  cropName: string;
}

const DashboardMain = () => {
  // 실제 데이터가 여러 개일 때를 가정해서 배열로 관리
  const myFarms: FarmData[] = [
    {
      id: 1,
      name: '동열 농장',
      ownerName: '정동열',
      extraMemberCount: 4,
      location: '우리집',
      cropName: '동열 토마토',
    },
    {
      id: 2,
      name: '동열 농장',
      ownerName: '정동열',
      extraMemberCount: 4,
      location: '우리집',
      cropName: '동열 토마토',
    },
    {
      id: 3,
      name: '동열 농장',
      ownerName: '정동열',
      extraMemberCount: 4,
      location: '우리집',
      cropName: '동열 토마토',
    },
  ];

  return (
    <div className="pageContainer bg-[#E6E0D3] flex flex-col overflow-y-auto">
      {/* --- 상단 영역 (이미지 + 인사말) --- */}
      <div className="relative w-full h-[320px] shrink-0">
        <div className="absolute inset-0 z-0 flex items-end">
          <img
            src={mainImg2}
            alt="Dashboard Background"
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="relative z-10 p-8 pt-12">
          <h1 className="text-heading-32B text-black leading-tight">
            HELLO, 동열!
          </h1>
          <p className="text-heading-20B text-black mt-1">
            당신의 농장을 관리 해주세요!
          </p>
        </div>
      </div>

      {/* --- 하단 리포트 영역 --- */}
      <div className="flex-1 bg-white px-6 pt-10 pb-10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] relative z-20">
        {/* 1. 내 농장 한눈에 보기 */}
        <section className="mb-10">
          <h2 className="text-body-16B text-black mb-6">내 농장 한눈에 보기</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: '총 농장', value: '19' },
              { label: '내가 만든 농장', value: '07' },
              { label: '초대 받은 농장', value: '12' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-full h-[85px] bg-[#E6E0D3] rounded-[18px] flex items-center justify-center border border-dashed border-[#20110A]">
                  <span className="text-[32px] font-bold text-black">
                    {item.value}
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 mt-2 text-center">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-[#8B8880] mb-8" />

        {/* 2. My FARM 섹션 */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-body-16B text-black">My FARM</h2>
            <button className="text-[10px] text-gray-500 bg-gray-100 px-3 py-1 rounded-full w-[85px] h-[30px]">
              농장 관리로 이동
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-2 scroll ">
            {/* 기존 농장 리스트 */}
            {myFarms.map((farm) => (
              <div key={farm.id} className="snap-center shrink-0">
                <FarmCard
                  name={farm.name}
                  ownerName={farm.ownerName}
                  extraMemberCount={farm.extraMemberCount}
                  location={farm.location}
                  cropName={farm.cropName}
                />
              </div>
            ))}

            {/* --- 마지막 농장 추가 카드 --- */}
            <div className="snap-center shrink-0">
              <button
                onClick={() => console.log('농장 추가 페이지로 이동!')}
                className="bg-[#F4F1EA] w-[260px] h-[150px] rounded-[16px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-4 hover:bg-[#ede9de] transition-colors"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Icon
                    icon="material-symbols:add"
                    className="text-[28px] text-gray-400"
                  />
                </div>
                <span className="text-[12px] font-bold text-gray-400">
                  나만의 농장을 추가 해주세요!
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <div className="mt-16 pb-4 text-center">
          <p className="text-caption-12M text-gray-300 tracking-widest">
            Smart FARM, Smart US.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
