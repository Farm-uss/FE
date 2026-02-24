import { useEffect, useRef, useState } from 'react';
import type { Address } from 'react-daum-postcode';

import step2Flower from '../../../public/icons/step2Flower.svg';
import AddressSearchModal from './AddressSearchModal';
import CropSelector from './CropSelector';
import FormSection from './FormSection';
interface Step2Props {
  onNext: () => void;
  onPrev: () => void;
}
const Step2 = ({ onNext, onPrev }: Step2Props) => {
  const [selectedCrop, setSelectedCrop] = useState('상추');
  const [customCrop, setCustomCrop] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const customInputRef = useRef<HTMLDivElement>(null);
  const detailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedCrop === '기타' && customInputRef.current) {
      setTimeout(() => {
        customInputRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 200);
    }
  }, [selectedCrop]);

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    if (data.addressType === 'R') {
      const extra =
        (data.bname ? data.bname : '') +
        (data.buildingName ? `, ${data.buildingName}` : '');
      fullAddress += extra ? ` (${extra})` : '';
    }
    setAddress(fullAddress);
    setIsPostcodeOpen(false);
    setTimeout(() => detailInputRef.current?.focus(), 100);
  };

  return (
    <div className="w-full h-full flex flex-col animate-fadeIn px-2 overflow-hidden relative">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto scroll min-h-0 mb-4 px-1"
      >
        {/* 헤더 섹션 */}
        <div className="flex items-center gap-6 mb-8 pt-2">
          <div className="w-[100px] h-[100px] bg-[#E8E2D5] rounded-[30px] flex items-center justify-center shrink-0">
            <img src={step2Flower} alt="flower" />
          </div>
          <div className="flex-1 space-y-2 text-center">
            <div className="text-h-20b text-[#20110A]">기본 정보</div>
            <div className="bg-[#E8E2D5] py-4 px-4 rounded-full inline-block text-c-10m text-[#20110A] w-full">
              농장의 기본 정보를 입력해주세요.
            </div>
          </div>
        </div>

        {/* 입력 필드들 */}
        <div className="space-y-6 mb-3">
          <FormSection label="농장이름">
            <input
              type="text"
              placeholder="농장의 이름을 입력해주세요."
              className="w-full px-5 py-4 rounded-2xl bg-[#E8E2D5]/50 text-c-10m outline-none"
            />
          </FormSection>

          <FormSection label="위치">
            <div className="flex flex-col gap-3">
              <input
                readOnly
                value={address}
                onClick={() => setIsPostcodeOpen(true)}
                placeholder="클릭하여 주소를 검색하세요."
                className="w-full px-5 py-4 rounded-2xl bg-[#E8E2D5]/50 text-c-10m outline-none cursor-pointer"
              />
              <input
                ref={detailInputRef}
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                placeholder="상세 정보를 입력해주세요."
                className={`w-full px-5 py-4 rounded-2xl bg-[#F4F1EA] text-c-10m outline-none transition-all duration-300 ${address ? 'opacity-100' : 'opacity-50'}`}
              />
            </div>
          </FormSection>

          <FormSection label="면적">
            <input
              type="text"
              placeholder="농장의 면적을 입력해주세요."
              className="w-full px-5 py-4 rounded-2xl bg-[#E8E2D5]/50 text-c-10m outline-none"
            />
          </FormSection>
        </div>

        {/* 작물 선택 섹션 */}
        <CropSelector
          selectedCrop={selectedCrop}
          setSelectedCrop={setSelectedCrop}
          customCrop={customCrop}
          setCustomCrop={setCustomCrop}
          customInputRef={customInputRef}
        />
      </div>

      {/* 하단 버튼 */}
      <div className="shrink-0 flex gap-4 pb-6">
        <button
          onClick={onPrev}
          className="flex-1 h-[56px] bg-[#20110A] text-white rounded-full text-b-16b active:scale-95 transition-all"
        >
          취소
        </button>
        <button
          onClick={onNext}
          className="flex-1 h-[56px] bg-[#20110A] text-white rounded-full text-b-16b active:scale-95 transition-all"
        >
          다음 단계
        </button>
      </div>

      <AddressSearchModal
        isOpen={isPostcodeOpen}
        onClose={() => setIsPostcodeOpen(false)}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default Step2;
