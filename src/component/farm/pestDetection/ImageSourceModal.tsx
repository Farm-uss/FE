interface ImageSourceModalProps {
  onUpload: () => void;
  onLatestCapture: () => void;
  onClose: () => void;
}

const ImageSourceModal = ({
  onUpload,
  onLatestCapture,
  onClose,
}: ImageSourceModalProps) => (
  <div
    className="fixed inset-0 z-50 flex items-end justify-center"
    onClick={onClose}
  >
    <div
      className="w-full max-w-[430px] bg-white rounded-t-[30px] pt-[20px] px-[24px] pb-[48px] flex flex-col gap-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-[60px] h-[4px] bg-[#CFC8B8] rounded-full mx-auto mb-[8px]" />

      <p className="text-h-18b text-[#20110A] text-center mb-2">이미지 선택</p>

      <button
        onClick={onUpload}
        className="w-full h-[56px] bg-[#20110A] text-white rounded-[16px] text-b-16b active:scale-95 transition-transform"
      >
        직접 촬영 / 업로드
      </button>

      <button
        onClick={() => {
          onLatestCapture();
          onClose();
        }}
        className="w-full h-[56px] bg-[#648E2E] text-white rounded-[16px] text-b-16b active:scale-95 transition-transform"
      >
        최근사진으로 검사하기
      </button>
    </div>
  </div>
);

export default ImageSourceModal;
