import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/axios';
import profileImg from '@/assets/image/manage/profile.webp';
import LazyImage from '@/component/constants/LazyImage';

type FarmResponse = {
  farmId: number;
  name: string;
  location: string;
  ownerName: string;
  memberCount: number;
  members: {
    userId: number;
    userName: string;
    role: 'OWNER' | 'MEMBER';
  }[];
  img: string;
  crops: string[];
  role: 'OWNER' | 'MEMBER';
  createdDate: string;
};

type Farm = {
  id: string;
  name: string;
  location: string;
  crop: string;
  img?: string;
};

const FarmThumb = ({
  img,
  onToggleEdit,
}: {
  img?: string;
  onToggleEdit: () => void;
}) => {
  return (
    <div className="relative w-[132px] h-[132px] rounded-[16px] overflow-hidden bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex-shrink-0">
      <LazyImage
        src={img || profileImg}
        alt="farm"
        fallback={profileImg}
        className="w-full h-full object-cover"
      />

      <button
        onClick={onToggleEdit}
        className="absolute bottom-[8px] left-[8px] w-[28px] h-[28px] rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/60 transition-colors"
      >
        <Icon
          icon="mdi:dots-horizontal"
          className="text-[18px] text-[#20110A]"
        />
      </button>
    </div>
  );
};
const FarmManageCard = ({
  farm,
  onDeleteClick,
}: {
  farm: Farm;
  onDeleteClick: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="w-full rounded-[22px] border-[1.5px] border-dashed border-[#B9B0A1] bg-[#F3EFE6] p-[16px]">
      <div className="flex items-stretch gap-[16px] h-full">
        <FarmThumb
          img={farm.img}
          onToggleEdit={() => setIsEditing(!isEditing)}
        />

        <div className="flex-1 flex flex-col justify-between min-w-0 py-[2px]">
          {!isEditing ? (
            <>
              <div className="w-full h-[38px] rounded-[10px] bg-white flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
                <span className="text-b-14b text-[#20110A] font-bold truncate px-3">
                  {farm.name}
                </span>
              </div>

              <div className="w-full h-[38px] rounded-[10px] bg-white flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
                <span className="text-b-14m text-[#20110A] truncate px-3">
                  {farm.location}
                </span>
              </div>

              <div className="w-full h-[38px] rounded-[10px] bg-white flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
                <span className="text-b-14m text-[#20110A] truncate px-3">
                  {farm.crop}
                </span>
              </div>
            </>
          ) : (
            <div className="flex flex-col h-full justify-center gap-[14px]">
              <button
                className="w-full h-[38px] rounded-[10px] bg-white flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:bg-gray-50 active:bg-gray-100 transition-colors"
                onClick={() => alert(`${farm.name} 수정 화면으로 이동합니다.`)}
              >
                <span className="text-[15px] font-bold text-[#20110A]">
                  수정하기
                </span>
              </button>

              <button
                className="w-full h-[38px] rounded-[10px] bg-white flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:bg-gray-50 active:bg-gray-100 transition-colors"
                onClick={onDeleteClick}
              >
                <span className="text-[15px] font-bold text-[#20110A]">
                  삭제하기
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AddFarmCard = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="w-full h-[164px] rounded-[22px] border-[1.5px] border-dashed border-[#B9B0A1] bg-[#F3EFE6] flex flex-col items-center justify-center gap-[18px] active:scale-[0.99] transition-transform hover:bg-[#ebe6db]"
      onClick={() => navigate('/farm-add')}
    >
      <p className="text-c-12m text-[#7E7366] mt-4">
        나만의 농장을 추가 해주세요!
      </p>

      <div className="w-[54px] h-[54px] rounded-full bg-white/60 flex items-center justify-center mb-2 shadow-sm">
        <Icon
          icon="material-symbols:add-rounded"
          className="text-[34px] text-[#D2C7B8]"
        />
      </div>
    </button>
  );
};

const ManageFarmsPage = () => {
  const [farmList, setFarmList] = useState<Farm[]>([]);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false); // 💡 삭제 중일 때 버튼 연타 방지용

  useEffect(() => {
    const fetchMyFarms = async () => {
      try {
        const response = await api.get<FarmResponse[]>('/farms/my');

        const mappedData: Farm[] = response.data.map((farm) => ({
          id: String(farm.farmId),
          name: farm.name,
          location: farm.location,
          crop: farm.crops?.[0] ?? '',
          img: farm.img,
        }));

        setFarmList(mappedData);
      } catch (error) {
        console.error('농장 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyFarms();
  }, []);

  const closeDeleteModal = () => {
    setDeleteTargetId(null);
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;

    try {
      setIsDeleting(true);

      await api.delete(`/farms/delete/${deleteTargetId}`);

      setFarmList((prev) => prev.filter((farm) => farm.id !== deleteTargetId));
      alert('농장이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('농장 삭제 실패:', error);
      alert('농장 삭제에 실패했습니다. 삭제 권한이 있는지 확인해주세요.');
    } finally {
      setIsDeleting(false);
      setDeleteTargetId(null);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-[16px] text-[#7E7366]">불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-white pb-[40px]">
      <div className="px-[22px] pt-[22px]">
        <div className="text-center">
          <h1 className="text-h-18b text-[#20110A] font-bold text-[20px]">
            내 농장 관리
          </h1>
          <div className="mt-[16px] h-[1px] w-full bg-[#E5DFD3]" />
        </div>

        <div className="mt-[24px] mb-[16px]">
          <h2 className="text-b-16b text-[#20110A] font-bold text-[18px]">
            농장 목록
          </h2>
          <p className="mt-[4px] text-c-12m text-[#7E7366] text-[13px]">
            나만의 농장을 추가하고, 관리해보세요!
          </p>
        </div>

        <div className="flex flex-col gap-[16px]">
          {farmList.map((farm) => (
            <FarmManageCard
              key={farm.id}
              farm={farm}
              onDeleteClick={() => setDeleteTargetId(farm.id)}
            />
          ))}
          <AddFarmCard />
        </div>

        <div className="mt-[40px] text-center">
          <p className="text-c-12m text-[#B0A79A] text-[13px]">
            Smart FARM, Smart US.
          </p>
        </div>
      </div>

      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
          <div className="w-[280px] rounded-[24px] bg-[#EBE5D6] p-[28px] shadow-lg flex flex-col items-center">
            <p className="text-[16px] font-bold text-[#20110A] mb-[28px]">
              이 농장을 삭제하시겠습니까?
            </p>

            <div className="flex w-full gap-[12px]">
              <button
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="flex-1 h-[42px] rounded-[12px] bg-white font-bold text-[15px] text-[#20110A] shadow-[0_2px_8px_rgba(0,0,0,0.05)] active:scale-95 transition-transform disabled:opacity-50"
              >
                NO
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 h-[42px] rounded-[12px] bg-white font-bold text-[15px] text-[#20110A] shadow-[0_2px_8px_rgba(0,0,0,0.05)] active:scale-95 transition-transform disabled:opacity-50 flex items-center justify-center"
              >
                {isDeleting ? '삭제 중...' : 'YES'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFarmsPage;
