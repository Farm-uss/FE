import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { updateProfileImage } from '@/apis/userService';
import CommonHeader from '@/component/constants/CommonHeader';
import CommonModal from '@/component/constants/CommonModal';
import LazyImage from '@/component/constants/LazyImage';
import LoadingSpinner from '@/component/constants/LoadingSpinner';
import ProfileSelectSheet from '@/component/constants/ProfileSelectSheet';
import { useMyProfile } from '@/hooks/useMyProfile';
import type { ProfileOption } from '@/types/user';

interface InfoRowProps {
  label: string;
  value?: string;
  actionLabel?: string;
}

const InfoRow = ({ label, value, actionLabel }: InfoRowProps) => (
  <div className="flex items-center justify-between py-4 border-b border-[#F3EFE6]">
    <span className="text-b-14m text-[#8B8880] w-28 shrink-0">{label}</span>
    <span className="text-b-16m text-[#20110A] flex-1">{value}</span>
    {actionLabel && (
      <button className="text-b-14m text-[#4A90D9] active:scale-90 transition-transform shrink-0">
        {actionLabel}
      </button>
    )}
  </div>
);

const MyProfilePage = () => {
  const navigate = useNavigate();
  const { data, loading, refetch } = useMyProfile();
  const [isProfileSelectOpen, setIsProfileSelectOpen] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
  }>({
    isOpen: false,
    title: '',
    description: '',
  });

  const handleProfileSelect = async (profile: ProfileOption) => {
    try {
      await updateProfileImage(profile.id);
      setIsProfileSelectOpen(false);
      refetch();
      setModal({
        isOpen: true,
        title: '변경 완료',
        description: '프로필 이미지가 변경되었습니다.',
      });
    } catch {
      setModal({
        isOpen: true,
        title: '변경 실패',
        description: '프로필 이미지 변경에 실패했습니다.\n다시 시도해주세요.',
      });
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="pageContainer bg-white flex flex-col">
      <div className="px-6 pt-6">
        <CommonHeader title="마이페이지" onPrev={() => navigate(-1)} />
      </div>

      {/* 프로필 이미지 + 닉네임 */}
      <div className="flex flex-col items-center pt-8 pb-8">
        <button
          className="relative w-[100px] h-[100px] active:scale-95 transition-transform"
          onClick={() => setIsProfileSelectOpen(true)}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-[#E8E2D5]">
            <LazyImage
              src={data?.profileImageUrl ?? ''}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-[28px] h-[28px] rounded-full bg-[#20110A] flex items-center justify-center">
            <Icon
              icon="material-symbols:camera-alt"
              className="text-[14px] text-white"
            />
          </div>
        </button>

        <div className="flex items-center gap-2 mt-4">
          <span className="text-h-20b text-[#20110A]">{data?.nickname}</span>
          <button className="active:scale-90 transition-transform">
            <Icon
              icon="material-symbols:edit"
              className="text-[20px] text-[#20110A]"
            />
          </button>
        </div>
      </div>

      {/* 구분선 */}
      <div className="h-4 bg-[#F3EFE6]" />

      {/* 기본정보 */}
      <div className="px-6 pt-6 flex flex-col">
        <h2 className="text-h-20b text-[#20110A] mb-2">기본정보</h2>
        <InfoRow label="이름" value={data?.nickname} />
        <InfoRow
          label="휴대폰번호"
          value={data?.phone_number}
          actionLabel="수정"
        />
        <InfoRow label="이메일주소" value={data?.email} actionLabel="수정" />
      </div>

      {isProfileSelectOpen && (
        <ProfileSelectSheet
          selectedId={undefined}
          onSelect={handleProfileSelect}
          onClose={() => setIsProfileSelectOpen(false)}
        />
      )}

      <CommonModal
        isOpen={modal.isOpen}
        onClose={() => setModal((prev) => ({ ...prev, isOpen: false }))}
        title={modal.title}
        description={modal.description}
      />
    </div>
  );
};

export default MyProfilePage;
