import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

import CommonHeader from '@/component/constants/CommonHeader';
import LazyImage from '@/component/constants/LazyImage';
import LoadingSpinner from '@/component/constants/LoadingSpinner';
import { useMyProfile } from '@/hooks/useMyProfile';

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
  const { data, loading } = useMyProfile();

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="pageContainer bg-white flex flex-col">
      <div className="px-6 pt-6">
        <CommonHeader title="마이페이지" onPrev={() => navigate(-1)} />
      </div>

      {/* 프로필 이미지 + 닉네임 */}
      <div className="flex flex-col items-center pt-8 pb-8">
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-[#E8E2D5]">
          <LazyImage
            src={data?.profileImageUrl ?? ''}
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </div>
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
      <div className="px-6 pt-6 flex flex-col gap-6">
        <h2 className="text-h-20b text-[#20110A]">기본정보</h2>

        <InfoRow label="이름" value={data?.nickname} />
        <InfoRow
          label="휴대폰번호"
          value={data?.phone_number}
          actionLabel="수정"
        />
        <InfoRow label="이메일주소" value={data?.email} actionLabel="수정" />
      </div>
    </div>
  );
};

export default MyProfilePage;
