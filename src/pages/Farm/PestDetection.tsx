import { useState } from 'react';

import Footer from '@/component/constants/Footer';
import BottomSheetHeader from '@/component/farm/farmDetail/BottomSheetHeader';
import DetectionLoadingView from '@/component/farm/pestDetection/DetectionLoadingView';
import DetectionResultView from '@/component/farm/pestDetection/DetectionResultView';
import DetectionStartView from '@/component/farm/pestDetection/DetectionStartView';
import DiseaseDetailSection from '@/component/farm/pestDetection/DiseaseDetailSection';

const PestDetection = () => {
  const [status, setStatus] = useState<'start' | 'loading' | 'result'>('start');
  const [isNormal] = useState(false);
  const [diseaseName] = useState('잎마름병');

  const handleStart = () => {
    setStatus('loading');
    setTimeout(() => setStatus('result'), 2000);
  };

  return (
    <div className="flex-1 flex flex-col items-center rounded-t-[30px] w-full scroll transition-all duration-700 bg-[#E6E0D3]">
      <div className="w-full py-6 px-9 flex flex-col gap-6 shrink-0 z-10">
        <BottomSheetHeader
          title="병해충 분석"
          description="내 농장이 건강한지 확인하세요!"
        />
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center">
        {status === 'start' && (
          <div className="px-9 w-full">
            <DetectionStartView onStart={handleStart} />
          </div>
        )}
        {status === 'loading' && (
          <div className="px-9 w-full">
            <DetectionLoadingView />
          </div>
        )}

        {status === 'result' && (
          <div className="w-full flex flex-col items-center">
            {/*  상단 결과 섹션 */}
            <DetectionResultView
              isNormal={isNormal}
              diseaseName={diseaseName}
            />

            {/* 하단 상세 설명 섹션 */}
            {!isNormal && (
              <div className="w-full shrink-0 px-9">
                <DiseaseDetailSection diseaseName={diseaseName} />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="px-9 w-full">
        <Footer />
      </div>
    </div>
  );
};
export default PestDetection;
