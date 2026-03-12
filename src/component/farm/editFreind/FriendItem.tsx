import type { Member } from '@/types/farm';

interface FriendItemProps {
  member: Member;
  onRemove: (id: number) => void;
}

const FriendItem = ({ member, onRemove }: FriendItemProps) => {
  // 프로필 이미지가 없을 때 보여줄 기본 색상
  const defaultBg = member.role === 'OWNER' ? 'bg-[#FFE24C]' : 'bg-[#8BB05C]';

  return (
    <div className="flex items-center gap-4 w-full">
      {/* 프로필 이미지 섹션 */}
      <div
        className={`w-24 h-24 rounded-full flex-none overflow-hidden border-2 border-white/20 shadow-sm flex items-center justify-center ${
          !member.profileImg ? defaultBg : 'bg-white'
        }`}
      >
        {member.profileImg ? (
          <img
            src={member.profileImg}
            alt={member.userName}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white font-bold text-xl">
            {member.userName[0]}
          </span>
        )}
      </div>

      {/* 정보 바 영역 */}
      <div className="flex-1 bg-[#E8E2D5] rounded-2xl h-20 flex items-center justify-between pl-3 pr-4 shadow-sm min-w-0">
        <div className="flex-1 flex justify-center min-w-0 mr-2">
          {/* 이름 표시 타원 */}
          <div className="w-[180px] bg-white py-2 rounded-full border border-[#D9D9D9]/50 flex justify-center items-center overflow-hidden">
            <span className="text-[#20110A] text-b-16b truncate px-2 font-bold">
              {member.userName}
            </span>
          </div>
        </div>

        {/*방장일 땐 뱃지, 멤버일 땐 내보내기 버튼 */}
        <div className="flex-none min-w-[80px] flex justify-end">
          {member.role === 'OWNER' ? (
            <div className="bg-[#648E2E] w-[68px] text-white text-c-12b px-5 py-2.5 rounded-full h-12 flex items-center justify-center shadow-sm">
              방장
            </div>
          ) : (
            /* 내보내기 버튼 */
            <button
              onClick={() => onRemove(member.userId)}
              className="bg-[#20110A] w-[68px] text-white text-c-12b px-5 py-2.5 rounded-full h-12 active:scale-95 transition-transform font-bold"
            >
              내보내기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendItem;
