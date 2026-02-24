// components/home/FarmList.tsx
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

import FarmCard from '@/component/home/FarmCard';
import type { FarmResponse } from '@/types/farm';

interface Props {
  farms: FarmResponse[];
}

const FarmList = ({ farms }: Props) => {
  const navigate = useNavigate();

  return (
    <section>
      {/* 헤더 부분 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-b-14m text-[#20110A]">My FARM</h2>
        <button className="text-c-10m text-black-60 bg-[#E6E0D3] py-1 rounded-full w-[85px] h-[30px]">
          농장 관리로 이동
        </button>
      </div>

      {/* 카드 리스트 (가로 스크롤) */}
      <div
        className={`flex gap-4 pb-4 px-2 ${
          farms.length === 0
            ? 'justify-center'
            : 'overflow-x-auto scrollbar-hide snap-x snap-mandatory'
        }`}
      >
        {/* 1. 기존 농장들 */}
        {farms.map((farm) => (
          <div key={farm.farmId} className="snap-center shrink-0">
            <FarmCard
              name={farm.name}
              ownerName={farm.ownerName}
              extraMemberCount={farm.memberCount}
              location={farm.location}
              cropName={farm.crops[0] || '작물 없음'}
              img={farm.img}
            />
          </div>
        ))}

        {/* 2. 농장 추가 버튼 카드 */}
        <div className="snap-center shrink-0">
          <button
            onClick={() => navigate('/farm-add')}
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
  );
};

export default FarmList;
