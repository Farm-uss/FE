interface QuizLocationStepProps {
  location: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
  error?: string | null;
}

const QuizLocationStep = ({
  location,
  onChange,
  onNext,
  onPrev,
  error,
}: QuizLocationStepProps) => {
  return (
    <div className="w-full space-y-8 animate-fadeIn px-4">
      <p className="text-c-12m text-[#20110A]/50 text-center">질문 1 / 5</p>
      <h2 className="text-h-20b text-[#20110A] text-center leading-snug">
        농장이 위치한 지역은 어디인가요?
      </h2>
      <input
        type="text"
        value={location}
        onChange={(e) => onChange(e.target.value)}
        placeholder="예: 서울시 성북구, 경기도 일산"
        className="w-full h-[52px] border border-[#20110A]/20 rounded-2xl px-4 text-b-16m text-[#20110A] bg-white outline-none focus:border-[#20110A]"
      />
      {error && <p className="text-c-12m text-red-500 text-center">{error}</p>}
      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="flex-1 h-[52px] bg-white border border-[#20110A]/20 text-[#20110A] rounded-full text-b-16b active:scale-95 transition-all"
        >
          이전
        </button>
        <button
          onClick={onNext}
          disabled={!location.trim()}
          className="flex-1 h-[52px] bg-[#20110A] text-white rounded-full text-b-16b shadow-lg active:scale-95 transition-all disabled:opacity-40"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default QuizLocationStep;
