import character from '../../assets/image/common/character2.svg';

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void; // 닫기 또는 취소
  onConfirm?: () => void; // 확인(액션) 버튼 클릭 시 실행할 함수
  title: string;
  description?: string;
  buttonText?: string; // 기본값 '확인'
  cancelText?: string; // 기본값 '취소'
  showCancel?: boolean; // 취소 버튼 표시 여부 (기본 false)
}

const CommonModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  buttonText = '확인',
  cancelText = '취소',
  showCancel = false,
}: CommonModalProps) => {
  if (!isOpen) return null;

  // 확인 버튼 클릭 핸들러
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(); // 별도의 액션 로직 실행
    }
    onClose(); // 모달 닫기
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-8 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#E8E2D5] w-full max-w-[320px] rounded-[40px] p-10 flex flex-col items-center gap-6 shadow-2xl">
        {/* 아이콘 영역 (캐릭터) */}
        <div className="w-24 h-24 flex items-center justify-center">
          <img
            src={character}
            alt="modal-icon"
            className="w-full h-full object-contain"
          />
        </div>

        {/* 텍스트 영역 */}
        <div className="space-y-2 text-center w-full">
          <h3 className="text-h-20b text-[#20110A] break-keep">{title}</h3>
          {description && (
            <p className="text-c-12m text-[#20110A]/60 whitespace-pre-wrap break-keep">
              {description}
            </p>
          )}
        </div>

        {/* 버튼 영역 */}
        <div className="flex gap-3 w-full mt-2">
          {/* 확인 버튼 */}
          <button
            onClick={handleConfirm}
            className="flex-1 h-[52px] bg-[#20110A] text-white rounded-full text-b-16b active:scale-95 transition-all shadow-lg"
          >
            {buttonText}
          </button>
          {/* showCancel이 true일 때만 취소 버튼 렌더링 */}
          {showCancel && (
            <button
              onClick={onClose}
              className="flex-1 h-[52px] bg-white text-[#20110A] rounded-full text-b-16b border border-[#20110A]/20 active:scale-95 transition-all"
            >
              {cancelText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
