import type { CropRecommendResponse } from '@/types/cropRecommend';

interface CropRecommendModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: CropRecommendResponse;
}

const CropRecommendModal = ({
  isOpen,
  onClose,
  result,
}: CropRecommendModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-6 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#E8E2D5] w-full max-w-[340px] rounded-[40px] p-8 flex flex-col gap-5 shadow-2xl max-h-[80dvh] overflow-y-auto">
        <div className="text-center">
          <h3 className="text-h-20b text-[#20110A]">AI 추천 작물</h3>
          {result.message && (
            <p className="text-c-12m text-[#20110A]/60 mt-1 whitespace-pre-wrap">
              {result.message}
            </p>
          )}
        </div>

        {result.recommendations.length > 0 ? (
          <div className="flex flex-col gap-3">
            {result.recommendations.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 flex flex-col gap-1 shadow-sm"
              >
                <span className="text-b-16b text-[#20110A]">
                  🌱 {item.cropName}
                </span>
                <span className="text-c-12m text-[#20110A]/60 leading-relaxed">
                  {item.reason}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-b-14m text-[#20110A]/60 text-center py-4">
            현재 환경에 적합한 작물을 찾지 못했어요.
          </p>
        )}

        <button
          onClick={onClose}
          className="w-full h-[52px] bg-[#20110A] text-white rounded-full text-b-16b active:scale-95 transition-all mt-2"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default CropRecommendModal;
