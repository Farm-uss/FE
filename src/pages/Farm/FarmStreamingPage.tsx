import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { captureCamera } from '@/apis/farmService';
import Footer from '@/component/constants/Footer';
import BottomSheetHeader from '@/component/farm/farmDetail/BottomSheetHeader';
import { useStreamingCamera } from '@/hooks/useStreamingCamera';
import type { CaptureResponse } from '@/types/farmService';

import type { FarmDetailContext } from './GrowthTraking';

const FarmStreamingPage = () => {
  const { farmInfo } = useOutletContext<FarmDetailContext>();
  const { imgRef, isStreaming, isConnected, streamError, start, stop } =
    useStreamingCamera(farmInfo.farmId);

  const [capturing, setCapturing] = useState(false);
  const [captureResult, setCaptureResult] = useState<CaptureResponse | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [captureError, setCaptureError] = useState<string | null>(null);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  const handleCapture = async () => {
    setCapturing(true);
    setCaptureError(null);
    try {
      const result = await captureCamera(farmInfo.farmId);
      setCaptureResult(result);
      setIsModalOpen(true);
    } catch {
      setCaptureError('캡처에 실패했어요. 다시 시도해주세요.');
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

      {/* 스트리밍 화면 */}
      <div className="bg-black w-full h-[270px] rounded-2xl shadow-inner overflow-hidden relative">
        {/* 스트리밍 화면 (항상 렌더, opacity로 제어) */}
        <img
          ref={imgRef}
          alt="스트리밍"
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${isConnected ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* 시작 전 — 카메라 버튼 */}
        {!isStreaming && !streamError && (
          <button
            onClick={start}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 active:scale-90 transition-transform"
          >
            <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center">
              <Icon
                icon="material-symbols:photo-camera-rounded"
                className="text-[44px] text-white/60"
              />
            </div>
            <span className="text-c-12m text-white/50">
              탭하여 스트리밍 시작
            </span>
          </button>
        )}

        {/* 연결 중 */}
        {isStreaming && !isConnected && !streamError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <p className="text-c-12m text-white/50">연결 중...</p>
          </div>
        )}

        {/* 에러 */}
        {streamError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <Icon
              icon="material-symbols:videocam-off-outline"
              className="text-[60px] text-white/20"
            />
            <p className="text-c-12m text-white/40">{streamError}</p>
            <button
              onClick={start}
              className="px-4 py-2 bg-white/10 rounded-full text-c-12m text-white/60 active:scale-95 transition-transform"
            >
              다시 시도
            </button>
          </div>
        )}

        {/* LIVE 뱃지 */}
        {isConnected && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 rounded-full px-3 py-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[11px] text-white font-medium">LIVE</span>
          </div>
        )}

        {/* 중지 버튼 */}
        {isStreaming && (
          <button
            onClick={stop}
            className="absolute top-3 right-3 bg-black/40 rounded-full p-2 active:scale-90 transition-transform"
          >
            <Icon
              icon="material-symbols:stop-rounded"
              className="text-[20px] text-white"
            />
          </button>
        )}
      </div>

      {captureError && (
        <p className="text-c-12m text-red-500">{captureError}</p>
      )}

      <div className="w-full flex justify-between items-center pt-4">
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
