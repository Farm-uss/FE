import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CommonHeader from '@/component/constants/CommonHeader';
import Footer from '@/component/constants/Footer';
import LoadingSpinner from '@/component/constants/LoadingSpinner';
import FriendAddModal from '@/component/farm/addFriend/FriendAddModal';
import FriendItem from '@/component/farm/editFreind/FriendItem'; // 임포트
import InviteSection from '@/component/farm/editFreind/InviteSection'; // 임포트
import { useFarmData } from '@/hooks/useFarmData';

import friendsImg from '../../assets/image/addfriend/addfriend.png';

const ManageFriendsPage = () => {
  const navigate = useNavigate();
  const { farmId } = useParams<{ farmId: string }>();
  const { farms, loading, error } = useFarmData();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const farmInfo = farms.find((f) => String(f.farmId) === farmId);

  // 임시 데이터 (나중에 API로 대체)
  const friendList = [
    { id: 1, name: '정동열님', color: 'bg-[#FFE24C]' },
    { id: 2, name: '정동열님', color: 'bg-[#4B433F]' },
    { id: 3, name: '정동열님', color: 'bg-[#4F6F52]' },
    { id: 4, name: '정동열님', color: 'bg-[#8BB05C]' },
    { id: 5, name: '정동열님', color: 'bg-[#8BB05C]' },
  ];

  const handleRemoveFriend = (id: number) => {
    console.log(`내보낼 친구 ID: ${id}`);
    // 여기에 삭제 API 연동하면 돼!
  };

  if (loading)
    return <LoadingSpinner message="농장 정보를 가져오고 있습니다!" />;
  if (error || !farmInfo) {
    return (
      <div className="bg-[#F4F1EA] h-dvh flex items-center justify-center">
        <p className="text-[#20110A]/60">농장 정보를 찾을 수 없어!</p>
      </div>
    );
  }

  return (
    <div className="bg-white h-dvh overflow-y-auto flex flex-col">
      <div className="flex-none px-6 pt-6">
        <CommonHeader title={farmInfo.name} onPrev={() => navigate(-1)} />
      </div>

      <div className="flex-1 px-8 pt-6 flex flex-col items-center">
        {/* 분리한 상단 섹션 */}
        <InviteSection image={friendsImg} />

        <div className="w-full border-t border-[#D9D9D9] pt-6 mb-6">
          <p className="text-center font-bold text-[#20110A] text-b-14b">
            내 친구 확인하기
          </p>
        </div>

        {/* 분리한 친구 아이템 리스트 */}
        <div className="w-full space-y-6 mb-10">
          {friendList.map((friend) => (
            <FriendItem
              key={friend.id}
              friend={friend}
              onRemove={handleRemoveFriend}
            />
          ))}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full border-2 border-dashed h-[60px] flex-none border-[#20110A]/40 rounded-2xl flex items-center justify-center text-[#20110A] text-b-16b bg-[#EAE5D8] mb-5 active:scale-95 transition-transform"
        >
          친구 추가 +
        </button>
      </div>

      <Footer />

      <FriendAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        farmId={Number(farmId)}
      />
    </div>
  );
};

export default ManageFriendsPage;
