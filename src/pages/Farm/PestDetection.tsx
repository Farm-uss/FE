import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { postVisionInference } from '@/apis/farmService';
import BottomSheetHeader from '@/component/farm/farmDetail/BottomSheetHeader';
import DetectionLoadingView from '@/component/farm/pestDetection/DetectionLoadingView';
import DetectionResultView from '@/component/farm/pestDetection/DetectionResultView';
import DetectionStartView from '@/component/farm/pestDetection/DetectionStartView';
import DiseaseDetailSection from '@/component/farm/pestDetection/DiseaseDetailSection';
import type { VisionInferenceData } from '@/types/farmService';

import type { FarmDetailContext } from './GrowthTraking';

const PestDetection = () => {
  const { farmInfo } = useOutletContext<FarmDetailContext>();

  const [status, setStatus] = useState<'start' | 'loading' | 'result'>('start');
  const [result, setResult] = useState<VisionInferenceData | null>(null);

  const handleImageInference = async (imageFile: File) => {
    setStatus('loading');
    try {
      const response = await postVisionInference(
        farmInfo.farmId,
        farmInfo.cropsId,
        imageFile,
      );

      if (response.success) {
        setResult(response.data);
        setStatus('result');
      }
    } catch (err) {
      console.error('분석 실패:', err);
      alert('분석 중 오류가 발생했습니다! 다시 시도해주세요.');
      setStatus('start');
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center rounded-t-[30px] w-full overflow-hidden transition-all duration-700 bg-[#E6E0D3]">
      <div className="w-full py-6 px-9 flex flex-col gap-6 shrink-0 z-10">
        <BottomSheetHeader
          title="병해충 분석"
          description="내 농장이 건강한지 확인하세요!"
        />
      </div>

      <div className="flex-1 w-full h-full flex flex-col items-center justify-center overflow-y-auto scroll-none">
        {status === 'start' && (
          <div className="px-9 w-full">
            {/* CHECK 버튼 누르면 사진 찍기 실행 */}
            <DetectionStartView onImageUpload={handleImageInference} />
          </div>
        )}

        {status === 'loading' && (
          <div className="px-9 w-full">
            <DetectionLoadingView />
          </div>
        )}

        {status === 'result' && result && (
          <div className="w-full flex flex-col items-center">
            {/* 서버 결과 기반 UI */}
            <DetectionResultView
              isNormal={result.diseaseStatus === 0}
              diseaseName={result.diseaseName}
            />

            {/* 정상이 아닐 때만 상세 정보 표시 */}
            {result.diseaseStatus !== 0 && (
              <div className="w-full shrink-0 px-9">
                <DiseaseDetailSection data={result} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PestDetection;
