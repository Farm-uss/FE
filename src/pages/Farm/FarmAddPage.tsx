import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CommonHeader from '@/component/constants/CommonHeader';
import Footer from '@/component/constants/Footer';

import step1Bar from '../../assets/icons/farmAdd/step1Bar.svg';
import step2Bar from '../../assets/icons/farmAdd/step2Bar.svg';
import step3Bar from '../../assets/icons/farmAdd/step3Bar.svg';
import farmAddBgImg from '../../assets/image/farmAdd/FarmAddBgImg.svg';
import Step1 from '../../component/farm/addFarm/Step1';
import Step2 from '../../component/farm/addFarm/Step2';
import Step3 from '../../component/farm/addFarm/Step3';

const FarmAddPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // ✨ 서버 전송용 상태들 (State Lifting)
  const [farmName, setFarmName] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [area, setArea] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('상추');
  const [customCrop, setCustomCrop] = useState('');

  const prevStep = () =>
    step === 1 ? navigate(-1) : setStep((prev) => prev - 1);

  const getStepChar = () => {
    switch (step) {
      case 1:
        return step1Bar;
      case 2:
        return step2Bar;
      case 3:
        return step3Bar;
      default:
        return step1Bar;
    }
  };

  return (
    /* ✨ 1. 부모 컨테이너: 화면 높이 고정 및 배경 처리 */
    <div
      className={`relative pageContainer h-dvh overflow-hidden transition-colors duration-500 ${
        step === 1 ? 'bg-transparent' : 'bg-white'
      }`}
    >
      {/* 1단계 배경 이미지: absolute로 고정해서 내용만 스크롤 되게 함 */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-700 ${
          step === 1 ? 'opacity-80' : 'opacity-0 invisible'
        }`}
      >
        <img src={farmAddBgImg} alt="" className="w-full h-full object-cover" />
      </div>

      {/* ✨ 2. 실제 스크롤이 일어나는 통: 형이 만든 .scroll 클래스 적용 */}
      <div className="relative z-10 flex flex-col h-full overflow-y-auto overflow-x-hidden scroll">
        {/* 상단 헤더 영역: 스크롤 시 위로 올라감 */}
        <div className="flex-none p-6 pb-0">
          <CommonHeader title="나만의 농장 추가하기" onPrev={prevStep} />

          <div className="text-center mt-4">
            <p className="text-b-14m text-gray-500">
              새로운 농장을 등록하고 스마트팜 시스템을 시작하세요.
            </p>
          </div>
        </div>

        {/* ✨ 3. 메인 입력 영역: h-auto로 설정해서 내용이 많아지면 푸터를 밀어냄 */}
        <main
          className={`flex-1 flex flex-col pt-6 px-6 pb-10 ${
            step !== 2 ? 'items-center justify-center' : ''
          } h-auto min-h-fit`}
        >
          {step === 1 && <Step1 onNext={() => setStep(2)} />}
          {step === 2 && (
            <Step2
              onNext={() => setStep(3)}
              onPrev={prevStep}
              farmName={farmName}
              setFarmName={setFarmName}
              address={address}
              setAddress={setAddress}
              detailAddress={detailAddress}
              setDetailAddress={setDetailAddress}
              area={area}
              setArea={setArea}
              selectedCrop={selectedCrop}
              setSelectedCrop={setSelectedCrop}
              customCrop={customCrop}
              setCustomCrop={setCustomCrop}
            />
          )}
          {step === 3 && (
            <Step3
              onPrev={prevStep}
              farmData={{
                name: farmName,
                address: `${address} ${detailAddress}`.trim(),
                area: Number(area),
                cropName: selectedCrop === '기타' ? customCrop : selectedCrop,
              }}
            />
          )}
        </main>

        {/* ✨ 4. 하단 진행률 바: 메인 컨텐츠가 끝나면 자연스럽게 등장 */}
        <footer className="shrink-0 bg-[#E8E2D5] p-6 flex flex-col gap-1">
          <div className="flex flex-col gap-3">
            <div className="w-full h-2.5 bg-white rounded-full relative">
              <div
                className="h-full bg-[#20110A] transition-all duration-500 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-10 h-10 transition-all duration-500"
                style={{ left: `calc(${(step / 3) * 100}% - 20px)` }}
              >
                <img
                  src={getStepChar()}
                  alt={`step ${step}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex justify-between items-center px-1 text-c-12m text-[#20110A]">
              <span>단계 {step}/3</span>
              <span className="font-bold">{Math.round((step / 3) * 100)}%</span>
            </div>
          </div>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default FarmAddPage;
