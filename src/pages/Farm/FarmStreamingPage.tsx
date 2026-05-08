import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { captureCamera } from '@/apis/farmService';
import Footer from '@/component/constants/Footer';
import BottomSheetHeader from '@/component/farm/farmDetail/BottomSheetHeader';
import type { CaptureResponse } from '@/types/farmService';

import type { FarmDetailContext } from './GrowthTraking';

const FarmStreamingPage = () => {
  const { farmInfo } = useOutletContext<FarmDetailContext>();
  const [capturing, setCapturing] = useState(false);
  const [captureResult, setCaptureResult] = useState<CaptureResponse | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCapture = async () => {
    setCapturing(true);
    setError(null);
    try {
      const result = await captureCamera(farmInfo.farmId);
      setCaptureResult(result);
      setIsModalOpen(true);
    } catch {
      setError('캡처에 실패했어요. 다시 시도해주세요.');
    } finally {
      setCapturing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center bg-[#E6E0D3]/50 rounded-t-[30px] py-6 px-10 w-full gap-5">
      <BottomSheetHeader
        title="카메라 스트리밍"
        description="실시간으로 내 농장을 확인하세요!"
      />

      <div className="bg-white w-full h-[270px] rounded-2xl flex items-center justify-center shadow-inner">
        <Icon
          icon="material-symbols:photo-camera-rounded"
          className="text-[150px] text-[#20110A]/20"
        />
      </div>

      <div className="text-center mt-2">
        <p className="text-c-12m text-[#20110A]/40">
          카메라 연결 상태를 확인 중입니다...
        </p>
        {error && <p className="text-c-12m text-red-500 mt-1">{error}</p>}
      </div>

      <div className="w-full flex justify-between items-center pt-10">
        <button className="w-[120px] h-[45px] text-b-14b bg-white border border-[#8B8880] rounded-3xl">
          해상도
        </button>
        <button
          onClick={handleCapture}
          disabled={capturing}
          className="w-[120px] h-[45px] text-b-14b bg-black text-white border border-[#8B8880] rounded-3xl active:scale-95 transition-all disabled:opacity-50"
        >
          {capturing ? '캡처 중...' : '캡처하기'}
        </button>
      </div>

      <Footer />

      {/* 캡처 결과 모달 */}
      {isModalOpen && captureResult && (
        <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-6 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#E8E2D5] w-full max-w-[340px] rounded-[40px] p-8 flex flex-col gap-5 shadow-2xl">
            <h3 className="text-h-20b text-[#20110A] text-center">
              📸 캡처 성공!
            </h3>
            <img
              src={captureResult.imageUrl}
              alt="캡처 이미지"
              className="w-full rounded-2xl object-cover"
            />
            <div className="text-center space-y-1">
              <p className="text-b-14m text-[#20110A]">
                {captureResult.cameraName}
              </p>
              <p className="text-c-12m text-[#20110A]/50">
                성공적으로 캡처되었습니다!
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full h-[52px] bg-[#20110A] text-white rounded-full text-b-16b active:scale-95 transition-all"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmStreamingPage;
