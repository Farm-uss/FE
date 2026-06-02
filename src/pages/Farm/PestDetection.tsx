import { useCallback, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import {
  getLatestCaptureInference,
  postVisionInference,
} from '@/apis/farmService';
import CommonModal from '@/component/constants/CommonModal';
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
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const handleImageInference = useCallback(
    async (imageFile: File) => {
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
        } else {
          setIsErrorOpen(true);
          setStatus('start');
        }
      } catch (err) {
        console.error('분석 실패:', err);
        setIsErrorOpen(true);
        setStatus('start');
      }
    },
    [farmInfo.farmId, farmInfo.cropsId],
  );

  const handleLatestCaptureInference = useCallback(async () => {
    setStatus('loading');
    try {
      const response = await getLatestCaptureInference(
        farmInfo.farmId,
        farmInfo.cropsId,
      );
      if (response.success) {
        setResult(response.data);
        setStatus('result');
      } else {
        setIsErrorOpen(true);
        setStatus('start');
      }
    } catch (err) {
      console.error('최근 캡처 분석 실패:', err);
      setIsErrorOpen(true);
      setStatus('start');
    }
  }, [farmInfo.farmId, farmInfo.cropsId]);

  return (
    <div className="flex-1 flex flex-col items-center rounded-t-[30px] w-full overflow-hidden transition-all duration-700 bg-[#E6E0D3]/50">
      <div className="w-full py-6 px-9 flex flex-col gap-6 shrink-0 z-10">
        <BottomSheetHeader
          title="병해충 분석"
          description="내 농장이 건강한지 확인하세요!"
        />
      </div>

      <div className="flex-1 w-full h-full flex flex-col items-center justify-center overflow-y-auto scroll-none">
        {status === 'start' && (
          <div className="px-9 w-full">
            <DetectionStartView
              onImageUpload={handleImageInference}
              onLatestCapture={handleLatestCaptureInference}
            />
          </div>
        )}

        {status === 'loading' && (
          <div className="px-9 w-full">
            <DetectionLoadingView />
          </div>
        )}

        {status === 'result' && result && (
          <div className="w-full flex flex-col items-center">
            <DetectionResultView
              isNormal={result.diseaseStatus === 0}
              diseaseName={result.diseaseName}
            />
            {result.diseaseStatus !== 0 && (
              <div className="w-full shrink-0 px-9">
                <DiseaseDetailSection data={result} />
              </div>
            )}
            <button
              onClick={() => {
                setResult(null);
                setStatus('start');
              }}
              className="mt-6 mb-10 w-[180px] h-[54px] bg-[#20110A] text-white rounded-[14px] text-b-16sb active:scale-95 transition-transform shadow-lg"
            >
              다시 분석하기
            </button>
          </div>
        )}
      </div>

      <CommonModal
        isOpen={isErrorOpen}
        onClose={() => setIsErrorOpen(false)}
        title="분석 실패"
        description={'분석 중 오류가 발생했습니다.\n다시 시도해주세요.'}
      />
    </div>
  );
};

export default PestDetection;
