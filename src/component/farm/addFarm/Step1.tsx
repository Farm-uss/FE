interface Step1Props {
  onNext: (useAi: boolean) => void;
}

const Step1 = ({ onNext }: Step1Props) => {
  return (
    <div className="w-full text-center space-y-10 animate-fadeIn px-4">
      <h2 className="text-h-20b text-[#20110A] leading-snug">
        현재 밭 상태에 맞는
        <br />
        작물 추천을 받겠습니까?
      </h2>
      <div className="flex gap-4 w-full">
        <button
          onClick={() => onNext(true)}
          className="w-full h-[56px] bg-[#20110A] text-white rounded-full text-b-16b shadow-lg active:scale-95 transition-all"
        >
          AI 추천 받을래요
        </button>
        <button
          onClick={() => onNext(false)}
          className="w-full h-[56px] bg-[#20110A] text-white rounded-full text-b-16b shadow-lg active:scale-95 transition-all"
        >
          아니요
        </button>
      </div>
    </div>
  );
};

export default Step1;
