import { Icon } from '@iconify/react';

import LazyImage from '@/component/constants/LazyImage';
import { useFarmImage } from '@/hooks/useFarmImage';

interface FarmCardProps {
  name: string;
  ownerName: string;
  extraMemberCount: number;
  location: string;
  cropName: string;
  img: string;
}
const DEFAULT_IMG =
  'https://hansungfarmimg.s3.eu-north-1.amazonaws.com/farm/farmBasicImg.svg';
const FarmCard = ({
  name,
  ownerName,
  extraMemberCount,
  location,
  cropName,
  img,
}: FarmCardProps) => {
  const displaySrc = useFarmImage(img);

  return (
    <div className="bg-[#E6E0D3] w-[260px] h-[150px] rounded-[16px] p-5 shadow-md shrink-0 flex flex-col">
      <div className="flex gap-3 items-start">
        {/* 썸네일 박스 */}
        <div className="w-[80px] h-[80px] bg-white rounded-[13px] shrink-0 overflow-hidden flex items-center justify-center">
          <LazyImage
            src={displaySrc}
            alt={name}
            fallback={DEFAULT_IMG}
            className="w-full h-full object-cover scale-110 transition-transform duration-300 hover:scale-125"
          />
        </div>
        {/* 카드 정보 */}
        <div className="flex flex-col gap-2 flex-1 min-w-0 text-left">
          <div className="bg-white h-[42px] rounded-xl px-3 flex items-center gap-2 w-full shadow-sm">
            <Icon
              icon="material-symbols:potted-plant"
              className="text-black text-[22px] shrink-0"
            />
            <span className="text-c-12m text-black truncate">{name}</span>
          </div>

          <div className="bg-white h-[30px] rounded-xl px-3 flex items-center gap-2 w-full shadow-sm">
            <Icon
              icon="material-symbols:group"
              className="text-black text-[18px] shrink-0"
            />
            <span className="text-c-10m text-black truncate">
              {extraMemberCount === 0
                ? `${ownerName}님 혼자 키워요!`
                : `${ownerName}님 외 ${extraMemberCount}명`}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex flex-col gap-0.5 px-1 text-left">
        <div className="flex gap-2 text-c-10m text-[#20110A]/60">
          <span className="shrink-0 font-semibold">위치 |</span>
          <span className="truncate">{location}</span>
        </div>
        <div className="flex gap-2 text-c-10m text-[#20110A]/60">
          <span className="shrink-0 font-semibold">작물명 |</span>
          <span className="truncate">{cropName}</span>
        </div>
      </div>
    </div>
  );
};

export default FarmCard;
