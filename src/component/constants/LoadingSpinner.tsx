import { Icon } from '@iconify/react';

interface Props {
  message?: string; // 로딩 메시지를 선택적으로 받음
  fullScreen?: boolean; // 전체 화면 모드 여부
  bgColor?: string;
}

const LoadingSpinner = ({
  message = '데이터 불러오는 중...',
  fullScreen = false,
  bgColor = 'bg-[#E6E0D3]',
}: Props) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${bgColor} // ✨ 전달받은 배경색 적용
      ${fullScreen ? 'fixed inset-0 z-100' : 'flex-1 w-full h-full'}`}
    >
      {/* 뱅글뱅글 돌아가는 아이콘 */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-16 h-16 border-4 border-[#648E2E] border-t-[#20110A] rounded-full animate-spin"></div>

        <Icon icon="mdi:sprout" className="text-[28px] text-[#20110A]" />
      </div>

      {/* 로딩 메시지 */}
      <p className="mt-8 text-b-16m text-[#20110A] animate-pulse">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
