import { useState } from 'react'; // 1. useState 추가
import { useNavigate, useParams } from 'react-router-dom';

import CommonHeader from '@/component/constants/CommonHeader';
import Footer from '@/component/constants/Footer';
import LoadingSpinner from '@/component/constants/LoadingSpinner';
import FriendAddModal from '@/component/farm/addFriend/FriendAddModal';
import { useFarmData } from '@/hooks/useFarmData';

import friendsImg from '../../assets/image/addfriend/addfriend.png';

const ManageFriendsPage = () => {
  const navigate = useNavigate();
  const { farmId } = useParams();
  const { farms, loading, error } = useFarmData();

  // 3. 모달 열림/닫힘 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  const farmInfo = farms.find((f) => String(f.farmId) === farmId);

  if (loading)
    return <LoadingSpinner message="농장 정보를 가져오고 있습니다!" />;
  if (error || !farmInfo) {
    return (
      <div className="bg-[#F4F1EA] h-dvh flex items-center justify-center">
        <p className="text-[#20110A]/60">농장 정보를 찾을 수 없어!</p>
      </div>
    );
  }

  const friendList = [
    { id: 1, name: '정동열님', color: 'bg-[#FFE24C]' },
    { id: 2, name: '정동열님', color: 'bg-[#4B433F]' },
    { id: 3, name: '정동열님', color: 'bg-[#4F6F52]' },
    { id: 4, name: '정동열님', color: 'bg-[#8BB05C]' },
    { id: 5, name: '정동열님', color: 'bg-[#8BB05C]' },
  ];

  return (
    /* h-dvh와 overflow-y-auto를 전체 컨테이너에 줘서 전체가 스크롤되게 함 */
    <div className="bg-white h-dvh overflow-y-auto flex flex-col">
      {/* 1. 헤더: 스크롤 시 같이 올라가게 하려면 flex-none 유지 */}
      <div className="flex-none px-6 pt-6">
        <CommonHeader title={farmInfo.name} onPrev={() => navigate('/home')} />
      </div>

      {/* 2. 본문 컨텐츠: 내부 스크롤(overflow-y-auto)을 제거하고 자연스럽게 흐르게 함 */}
      <div className="flex-1 px-8 pt-6 flex flex-col items-center">
        {/* 상단 섹션 */}
        <div className="w-full h-[190px] flex flex-col justify-between items-center pt-4 mb-12">
          <div className="text-h-20b text-[#20110A] mb-10 text-center leading-tight">
            친구를 내 농장에 초대해보세요!!
          </div>
          <div className="w-[234px] h-[100px] flex items-center justify-center">
            <img
              src={friendsImg}
              alt="친구들"
              className="w-full h-full object-contain transform scale-110"
            />
          </div>
        </div>

        {/* 구분선 및 타이틀 */}
        <div className="w-full border-t border-[#D9D9D9] pt-6 mb-6">
          <p className="text-center font-bold text-[#20110A] text-b-14b">
            내 친구 확인하기
          </p>
        </div>

        {/* 친구 목록 */}
        <div className="w-full space-y-6 mb-10">
          {friendList.map((friend) => (
            <div key={friend.id} className="flex items-center gap-4 w-full">
              <div
                className={`w-24 h-24 rounded-full flex-none ${friend.color} border-2 border-white/20 shadow-sm`}
              />
              <div className="flex-1 bg-[#E8E2D5] rounded-2xl h-20 flex items-center justify-between pl-3 pr-4 shadow-sm min-w-0">
                <div className="flex-1 flex justify-center min-w-0 mr-2">
                  <div className="w-[180px] bg-[#ffffff] py-2 rounded-full border border-[#D9D9D9]/50 flex justify-center items-center overflow-hidden">
                    <span className="text-[#20110A] text-b-16b truncate px-2">
                      {friend.name}
                    </span>
                  </div>
                </div>
                <div className="flex-none">
                  <button className="bg-[#20110A] text-white text-c-12b px-5 py-2.5 rounded-full h-12">
                    내보내기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 친구 추가 버튼 */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full border-2 border-dashed h-[60px] flex-none border-[#20110A]/40 rounded-2xl flex items-center justify-center text-[#20110A] text-b-16b bg-[#EAE5D8] mb-5 active:scale-95 transition-transform"
        >
          친구 추가 +
        </button>
      </div>

      <Footer />

      {/* 모달은 fixed이므로 위치 상관 없음 */}
      <FriendAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        farmId={Number(farmId)}
      />
    </div>
  );
};

export default ManageFriendsPage;
