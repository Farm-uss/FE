import detectionNormal from '@/assets/image/pestDetection/detectionNomal.svg';
import detectionWarning from '@/assets/image/pestDetection/detectionWarning.svg';

interface DetectionResultViewProps {
  isNormal: boolean;
  diseaseName?: string;
}
const DetectionResultView = ({
  isNormal,
  diseaseName,
}: DetectionResultViewProps) => {
  return (
    <div
      className="relative w-full flex flex-col items-center pt-10 pb-16 px-9 animate-in fade-in duration-700 gap-12"
      style={{
        background: isNormal
          ? 'linear-gradient(180deg, #E8E2D5 0%, #A2B67D 75%, #86A459 91%, #648E2E 100%)'
          : 'linear-gradient(180deg, #E8E2D5 0%, #B7867A 50%, #8E392E 85%, #7A2F26 100%)',
      }}
    >
      <div className="text-center z-10">
        {isNormal ? (
          <p className="text-h-20b text-[#20110A]">
            현재 농장은 <span className="text-[#008649] text-h-28b">정상</span>
            입니다!
          </p>
        ) : (
          <p className="text-h-20b text-[#20110A]">
            현재 농장은{' '}
            <span className="text-[#8E392E] text-h-28b">{diseaseName}</span>에
            취약합니다.
          </p>
        )}
      </div>

      <div className="relative pt-10 z-10">
        <img
          src={isNormal ? detectionNormal : detectionWarning}
          className="scale-125 drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
        />
      </div>

      {!isNormal && (
        <p className="text-b-16b text-white animate-bounce z-10">
          당신의 농장을 구해주세요!
        </p>
      )}
    </div>
  );
};

export default DetectionResultView;
