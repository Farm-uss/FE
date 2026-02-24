import type { Dispatch, RefObject, SetStateAction } from 'react';

import FormSection from './FormSection';

interface CropSelectorProps {
  selectedCrop: string;
  setSelectedCrop: Dispatch<SetStateAction<string>>;
  customCrop: string;
  setCustomCrop: Dispatch<SetStateAction<string>>;
  customInputRef: RefObject<HTMLDivElement | null>;
}

const CropSelector = ({
  selectedCrop,
  setSelectedCrop,
  customCrop,
  setCustomCrop,
  customInputRef,
}: CropSelectorProps) => {
  const crops = [
    '토마토',
    '딸기',
    '상추',
    '배추',
    '고추',
    '민트',
    '바질',
    '오이',
    '파',
    '기타',
  ];

  return (
    <div className="space-y-4 mb-6 text-[#20110A]">
      <FormSection label="작물">
        <div className="grid grid-cols-5 gap-2">
          {crops.map((crop) => (
            <button
              key={crop}
              type="button"
              onClick={() => setSelectedCrop(crop)}
              className={`px-5 py-2 rounded-full text-c-12r transition-all duration-300 ${
                selectedCrop === crop
                  ? 'bg-[#20110A] text-white scale-105 shadow-md'
                  : 'bg-[#E8E2D5]'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </FormSection>

      <div
        ref={customInputRef}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          selectedCrop === '기타'
            ? 'max-h-[120px] opacity-100 mb-10 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="pt-2">
          <input
            type="text"
            value={customCrop}
            onChange={(e) => setCustomCrop(e.target.value)}
            placeholder="작물 이름을 적어주세요!"
            className="w-full px-5 py-4 rounded-2xl bg-[#F4F1EA] border border-[#20110A]/20 text-c-10m outline-none shadow-inner"
          />
        </div>
      </div>
    </div>
  );
};

export default CropSelector;
