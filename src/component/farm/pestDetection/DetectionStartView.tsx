import { useRef } from 'react';

import detectionStart from '@/assets/image/pestDetection/detectionStart.svg';

interface Props {
  // ✨ 타입을 string에서 File로 변경! (멀티파트 전송용)
  onImageUpload: (image: File) => void;
}

const DetectionStartView = ({ onImageUpload }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    // 버튼 누르면 숨겨진 input 클릭!
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // 👈 이게 바로 브라우저가 생성한 File 객체!
    if (file) {
      // ✨ FileReader로 읽을 필요 없이 파일 객체 그대로 부모(PestDetection)에게 전달!
      onImageUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full gap-8 animate-in fade-in duration-500">
      {/* 숨겨진 파일 인풋: accept="image/*"로 이미지 제한, capture="environment"로 카메라 우선 실행 */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <div className="text-center">
        <p className="text-h-20b text-[#20110A] leading-relaxed">
          지금 내 작물이
          <br />
          병해충에 걸렸는지 확인 해보시겠습니까?
        </p>
      </div>

      <button
        className="bg-[#20110A] text-[#E6E0D3] w-[180px] h-[54px] rounded-[14px] text-b-16sb flex items-center justify-center active:scale-95 transition-transform shadow-lg"
        onClick={handleButtonClick}
      >
        CHECK
      </button>

      <div className="mt-6">
        <img
          src={detectionStart}
          alt="병해충 분석 시작 캐릭터"
          className="scale-120"
        />
      </div>
    </div>
  );
};

export default DetectionStartView;
