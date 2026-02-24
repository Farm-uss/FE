import { Icon } from '@iconify/react';

interface CommonHeaderProps {
  title: string;
  onPrev: () => void;
  showBackIcon?: boolean;
}

const CommonHeader = ({
  title,
  onPrev,
  showBackIcon = true,
}: CommonHeaderProps) => {
  return (
    <header className="flex justify-between items-center pb-5 border-b border-[#8B8880] shrink-0">
      {showBackIcon ? (
        <button
          onClick={onPrev}
          className="p-2 -ml-2 active:scale-90 transition-transform"
        >
          <Icon
            icon="material-symbols:arrow-back-ios-new-rounded"
            className="text-[24px] text-[#20110A]"
          />
        </button>
      ) : (
        <div className="w-10" />
      )}

      <h1 className="text-h-24b text-[#20110A]">{title}</h1>

      {/* 오른쪽 균형 맞추기용 빈 공간 */}
      <div className="w-10" />
    </header>
  );
};

export default CommonHeader;
