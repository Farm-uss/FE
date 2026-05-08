interface QuizOption {
  label: string;
  value: string;
}

interface QuizChoiceStepProps {
  currentQ: number;
  totalQ: number;
  question: string;
  options: QuizOption[];
  onSelect: (value: string) => void;
  onPrev: () => void;
}

const QuizChoiceStep = ({
  currentQ,
  totalQ,
  question,
  options,
  onSelect,
  onPrev,
}: QuizChoiceStepProps) => {
  return (
    <div className="w-full space-y-6 animate-fadeIn px-4">
      <p className="text-c-12m text-[#20110A]/50 text-center">
        질문 {currentQ} / {totalQ}
      </p>
      <h2 className="text-h-20b text-[#20110A] text-center leading-snug">
        {question}
      </h2>
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className="w-full h-[56px] bg-white border border-[#20110A]/20 text-[#20110A] rounded-2xl text-b-16m active:scale-95 active:bg-[#20110A] active:text-white transition-all"
          >
            {option.label}
          </button>
        ))}
      </div>
      <button
        onClick={onPrev}
        className="w-full h-[48px] text-[#20110A]/50 text-b-14m active:scale-95 transition-all"
      >
        ← 이전으로
      </button>
    </div>
  );
};

export default QuizChoiceStep;
