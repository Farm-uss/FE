import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CommonHeader from '@/component/constants/CommonHeader';

import step1Bar from '../../../public/icons/step1Bar.svg';
import step2Bar from '../../../public/icons/step2Bar.svg';
import step3Bar from '../../../public/icons/step3Bar.svg';
import farmAddBgImg from '../../../public/img/FarmAddBgImg.svg';
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
    <div
      className={`relative pageContainer h-full overflow-hidden transition-colors duration-500 ${step === 1 ? 'bg-transparent' : 'bg-white'}`}
    >
      {/* 1단계 배경 이미지 */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-700 ${step === 1 ? 'opacity-80' : 'opacity-0 invisible'}`}
      >
        <img src={farmAddBgImg} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex-1 flex flex-col p-6 overflow-hidden">
          {/* 공통 헤더 */}
          <CommonHeader title="나만의 농장 추가하기" onPrev={prevStep} />

          <div className="text-center mt-4 shrink-0">
            <p className="text-b-14m text-gray-500">
              새로운 농장을 등록하고 스마트팜 시스템을 시작하세요.
            </p>
          </div>

          <main
            className={`flex-1 flex flex-col min-h-0 pt-6 ${step !== 2 ? 'items-center justify-center' : ''}`}
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
        </div>

        {/* 하단 진행률 바 */}
        <footer className="shrink-0 bg-[#E8E2D5] p-6 flex flex-col gap-6">
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
          <div className="text-center text-c-10m text-[#20110A]/40 uppercase tracking-widest font-medium">
            Smart FARM, Smart US.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FarmAddPage;
