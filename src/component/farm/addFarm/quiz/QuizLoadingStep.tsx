import recommendImg from '@/assets/image/recommend/recommend.webp';

const QuizLoadingStep = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 animate-fadeIn px-4">
      <div className="w-48 h-48 flex items-center justify-center">
        <img
          src={recommendImg}
          alt="AI 추천 중"
          className="w-full h-full object-contain animate-bounce"
        />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-h-20b text-[#20110A]">AI가 분석 중이에요</h2>
        <p className="text-c-12m text-[#20110A]/60">
          딱 맞는 작물을 찾고 있어요...
        </p>
      </div>
      <div className="flex gap-2">
        <span className="w-2 h-2 bg-[#648E2E] rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 bg-[#648E2E] rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-[#648E2E] rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
};

export default QuizLoadingStep;
