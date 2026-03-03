import { useState } from 'react';
import FriendAddModal from '../addFriend/FriendAddModal';

interface FarmInfoSectionProps {
  crop: string;
  location: string;
  area: string;
  memberCount: number;
  ownerName: string;
}

const FarmInfoSection = ({
  crop,
  location,
  area,
  memberCount,
  ownerName,
}: FarmInfoSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="w-full pb-4">
        <div className="flex justify-around items-center py-5 border-b border-[#8B8880] text-center">
          <div className="flex flex-col items-center gap-1 flex-1">
            <span className="text-b-16b text-[#20110A]">작물</span>
            <span className="text-c-12m text-[#20110A]">{crop}</span>
          </div>

          <div className="w-px h-8 bg-[#8B8880]/30 shrink-0" />

          <div className="flex flex-col items-center gap-1 flex-1">
            <span className="text-b-16b text-[#20110A]">위치</span>
            <span className="text-c-12m text-[#20110A] truncate max-w-[80px]">
              {location}
            </span>
          </div>

          <div className="w-px h-8 bg-[#8B8880]/30 shrink-0" />

          <div className="flex flex-col items-center gap-1 flex-1">
            <span className="text-b-16b text-[#20110A]">면적</span>
            <span className="text-b-12m text-[#20110A]">{area}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 px-1">
          <span className="text-c-10m text-[#20110A]">
            {memberCount > 0
              ? `${ownerName}님 외 ${memberCount}명과 같이 키우고 있어요!`
              : `${ownerName}님이 열심히 혼자 키우고 있어요!`}
          </span>

          <button
            onClick={() => setIsModalOpen(true)}
            className="text-c-10m text-[#20110A] flex items-center gap-1"
          >
            친구추가 +
          </button>
        </div>
      </section>

      <FriendAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default FarmInfoSection;