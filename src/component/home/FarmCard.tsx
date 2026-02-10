import { Icon } from '@iconify/react';

// 카드에 들어갈 데이터 타입 정의
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
    <div className="bg-[#E6E0D3] w-[260px] h-[150px] rounded-[16px] p-6 shadow-md shrink-0">
      <div className="flex gap-4 items-start">
        {/* 썸네일 박스 */}
        <div className="w-[80px] h-[80px] bg-white rounded-[13px] shrink-0"></div>

        {/* 카드 정보 */}
        <div className="flex flex-col gap-2 w-full">
          {/* 농장 이름 */}
          <div className="bg-white w-[130px] h-[42px] rounded-xl px-3 py-2 flex items-center gap-2">
            <Icon
              icon="material-symbols:potted-plant"
              className="text-black text-[24px]"
            />
            <span className="text-body-14B truncate">{name}</span>
          </div>

          {/* 멤버 정보 */}
          <div className="bg-white w-[130px] h-[30px] rounded-xl px-3 py-2 flex items-center gap-2">
            <Icon
              icon="material-symbols:group"
              className="text-black text-[20px]"
            />
            <span className="text-body-12M text-gray-600 truncate">
              {ownerName}님 외 {extraMemberCount}명
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-6 text-[11px] text-gray-600 font-medium px-2">
        <span>위치 | {location}</span>
        <span>작물명 | {cropName}</span>
      </div>
    </div>
  );
};

export default FarmCard;
