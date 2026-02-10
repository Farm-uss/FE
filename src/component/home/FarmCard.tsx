import { Icon } from '@iconify/react';

interface FarmCardProps {
  name: string;
  ownerName: string;
  extraMemberCount: number;
  location: string;
  cropName: string;
}

const FarmCard = ({
  name,
  ownerName,
  extraMemberCount,
  location,
  cropName,
}: FarmCardProps) => {
  return (
    <div className="bg-[#E6E0D3] w-[260px] h-[150px] rounded-[16px] p-5 shadow-md shrink-0 flex flex-col">
      <div className="flex gap-3 items-start">
        {/* 썸네일 박스 */}
        <div className="w-[80px] h-[80px] bg-white rounded-[13px] shrink-0"></div>

        {/* 카드 정보 */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <div className="bg-white h-[42px] rounded-xl px-3 flex items-center gap-2 w-full">
            <Icon
              icon="material-symbols:potted-plant"
              className="text-black text-[22px] shrink-0"
            />
            <span className="text-c-12m text-black truncate">{name}</span>
          </div>

          <div className="bg-white h-[30px] rounded-xl px-3 flex items-center gap-2 w-full">
            <Icon
              icon="material-symbols:group"
              className="text-black text-[18px] shrink-0"
            />
            <span className="text-c-10m text-black truncate">
              {ownerName}님 외 {extraMemberCount}명
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex flex-col gap-0.5 px-1">
        <div className="flex gap-2 text-c-10m text-black-60">
          <span className="shrink-0">위치 |</span>
          <span className="truncate">{location}</span>
        </div>
        <div className="flex gap-2 text-c-10m text-black-60">
          <span className="shrink-0">작물명 |</span>
          <span className="truncate">{cropName}</span>
        </div>
      </div>
    </div>
  );
};

export default FarmCard;
