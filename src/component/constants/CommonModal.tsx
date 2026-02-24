import character from '../../../public/img/character2.svg';

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  buttonText?: string;
  iconName?: string;
}

const CommonModal = ({
  isOpen,
  onClose,
  title,
  description,
  buttonText = '확인',
}: CommonModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 bg-black/50 flex items-center justify-center p-8 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#E8E2D5] w-full max-w-[320px] rounded-[40px] p-10 flex flex-col items-center gap-6 shadow-2xl">
        {/* 아이콘 영역 */}
        <img src={character} />

        {/* 텍스트 영역 */}
        <div className="space-y-2 text-center">
          <h3 className="text-h-20b text-[#20110A]">{title}</h3>
          {description && (
            <p className="text-c-12m text-gray-500 whitespace-pre-wrap">
              {description}
            </p>
          )}
        </div>

        {/* 확인 버튼 */}
        <button
          onClick={onClose}
          className="w-full h-[52px] bg-[#20110A] text-white rounded-full text-b-16b active:scale-95 transition-all"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CommonModal;
