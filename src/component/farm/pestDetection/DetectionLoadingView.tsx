import detectionLoading from '@/assets/image/pestDetection/loadingDetection.svg';

const DetectionLoadingView = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full animate-in fade-in zoom-in duration-500">
      <div className="mt-4">
        <img
          src={detectionLoading}
          alt="병해충 관찰 중 (말풍선 포함)"
          className="scale-120 animate-pulse"
        />
      </div>
    </div>
  );
};

export default DetectionLoadingView;
