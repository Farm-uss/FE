import type { FarmSummary as FarmSummaryType } from '@/types/farm';

const FarmSummary = ({ summary }: { summary: FarmSummaryType | null }) => {
  const items = [
    { label: '총 농장', value: summary?.totalFarmCount ?? 0 },
    { label: '내가 만든 농장', value: summary?.ownedFarmCount ?? 0 },
    { label: '초대 받은 농장', value: summary?.joinedFarmCount ?? 0 },
  ];

  return (
    <section className="mb-10">
      <div className="text-b-14m text-black mb-6">내 농장 한눈에 보기</div>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-full h-[85px] bg-[#E6E0D3] rounded-[18px] flex items-center justify-center border border-dashed border-[#20110A]">
              <span className="text-h-28b text-black">
                {String(item.value).padStart(2, '0')}
              </span>
            </div>
            <span className="text-c-12b text-black-60 mt-2">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FarmSummary;
