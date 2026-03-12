import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CommonHeader from '@/component/constants/CommonHeader';
import CommonModal from '@/component/constants/CommonModal';
import Footer from '@/component/constants/Footer';
import LoadingSpinner from '@/component/constants/LoadingSpinner';
import FriendAddModal from '@/component/farm/addFriend/FriendAddModal';
import FriendItem from '@/component/farm/editFreind/FriendItem';
import InviteSection from '@/component/farm/editFreind/InviteSection';
import { useDeleteFriends } from '@/hooks/useDeleteFriends';

import friendsImg from '../../assets/image/addfriend/addfriend.png';

const ManageFriendsPage = () => {
  const navigate = useNavigate();
  const { farmId } = useParams<{ farmId: string }>();

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [successTitle, setSuccessTitle] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    farmInfo,
    members,
    loading,
    error,
    refetch,
    isConfirmOpen,
    setIsConfirmOpen,
    isSuccessOpen,
    setIsSuccessOpen,
    openDeleteModal,
    handleDeleteConfirm,
  } = useDeleteFriends(farmId);

  const handleAddSuccess = async () => {
    if (refetch) await refetch(); // 목록 새로고침
    setSuccessTitle('친구 초대');
    setSuccessMessage('친구를 농장에 초대했습니다!');
    setIsSuccessOpen(true); // 성공 모달 띄우기
  };

  //  멤버 내보내기 성공 시 메시지 설정 (삭제 핸들러 호출 전/후에 처리)
  const handleDeleteAction = async () => {
    setSuccessTitle('친구 내보내기');
    setSuccessMessage('멤버를 성공적으로 내보냈습니다!');
    await handleDeleteConfirm();
  };

  if (loading) return <LoadingSpinner message="정보를 가져오고 있습니다!" />;
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
          {members.map((member) => (
            <FriendItem
              key={member.userId}
              member={member}
              onRemove={openDeleteModal}
            />
          ))}
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full border-2 border-dashed h-[60px] flex-none border-[#20110A]/40 rounded-2xl flex items-center justify-center text-[#20110A] text-b-16b bg-[#EAE5D8] mb-5 active:scale-95 transition-transform"
        >
          친구 추가 +
        </button>
      </div>

      <Footer />

      {/*  친구 추가 모달: onSuccess에 refetch 로직 연결 */}
      <FriendAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        farmId={Number(farmId)}
        onSuccess={handleAddSuccess}
      />

      {/* 2. 내보내기 확인 컨펌 모달 */}
      <CommonModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteAction}
        title="멤버 내보내기"
        description="정말 이 멤버를 농장에서 내보낼까요?"
        buttonText="내보내기"
        showCancel={true}
      />

      {/* 3. 성공 알림 모달 (추가/삭제 공용) */}
      <CommonModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title={successTitle}
        description={successMessage}
      />
    </div>
  );
};

export default ManageFriendsPage;
