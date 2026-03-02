interface GDDHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GDDHelpModal = ({ isOpen, onClose }: GDDHelpModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-6">
      {/* 배경 오버레이 (클릭 시 닫힘) */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white w-full max-w-[340px] rounded-[30px] p-8 shadow-xl flex flex-col gap-6 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center">
          <h3 className="text-b-16b text-[#20110A]">생장 도일(GDD) 가이드</h3>
          <div />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-b-14b text-[#20110A]">
              1. "생장도일(GDD)이 무엇인가요?"
            </p>
            <p className="text-c-12m text-[#20110A]/80 leading-relaxed">
              식물은 단순히 날짜가 지난다고 자라는 게 아니라, '온도'라는
              에너지를 먹고 자라요. <br />
              생장도일(GDD)은 우리 식물이 오늘 하루 동안 성장에 사용한 에너지를
              점수로 계산한 것이랍니다.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-b-14b text-[#20110A]">
              2. "어떻게 수확일을 예측하나요?"
            </p>
            <p className="text-c-12m text-[#20110A]/80 leading-relaxed">
              작물마다 수확까지 채워야 하는 '목표 점수'가 정해져 있어요. <br />
              팜어스는 공공데이터와 연동된 정밀한 계산법을 사용해요.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#20110A] text-white rounded-xl text-b-14b mt-2 active:scale-[0.98] transition-transform"
        >
          확인했어요
        </button>
      </div>
    </div>
  );
};

export default GDDHelpModal;
