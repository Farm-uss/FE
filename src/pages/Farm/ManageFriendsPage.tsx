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

  // 현재 페이지의 농장 정보 찾기
  const farmInfo = farms.find((f) => String(f.farmId) === farmId);

  const members = farmInfo?.members || [];

  const handleRemoveFriend = (userId: number) => {
    console.log(`내보낼 유저 ID: ${userId}`);
  };

  if (loading)
    return <LoadingSpinner message="농장 정보를 가져오고 있습니다!" />;
  if (error || !farmInfo)
    return <div className="p-10 text-center">농장을 찾을 수 없어!</div>;

  return (
    <div className="bg-white h-dvh overflow-y-auto flex flex-col">
      <div className="flex-none px-6 pt-6">
        <CommonHeader title={farmInfo.name} onPrev={() => navigate(-1)} />
      </div>

      <div className="flex-1 px-8 pt-6 flex flex-col items-center">
        <InviteSection image={friendsImg} />

        <div className="w-full border-t border-[#D9D9D9] pt-6 mb-6">
          <p className="text-center font-bold text-[#20110A] text-b-14b">
            내 친구 확인하기
          </p>
        </div>

        <div className="w-full space-y-6 mb-10">
          {members.length > 0 ? (
            members.map((member) => (
              <FriendItem
                key={member.userId}
                member={member}
                onRemove={handleRemoveFriend}
              />
            ))
          ) : (
            <p className="text-gray-400 py-10">아직 등록된 멤버가 없습니다!</p>
          )}
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
