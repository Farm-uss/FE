import { Icon } from '@iconify/react';
import DaumPostcodeEmbed, { type Address } from 'react-daum-postcode';

interface AddressSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: Address) => void;
}

const AddressSearchModal = ({
  isOpen,
  onClose,
  onComplete,
}: AddressSearchModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-6 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-[400px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* 헤더 */}
        <div className="p-5 bg-[#E8E2D5] flex justify-between items-center text-[#20110A] font-bold border-b border-[#8B8880]/20">
          <span className="text-b-16b">주소 검색</span>
          <button
            onClick={onClose}
            className="p-1 hover:rotate-90 transition-transform duration-300"
          >
            <Icon icon="material-symbols:close-rounded" className="text-2xl" />
          </button>
        </div>
        {/* 주소 검색 영역 */}
        <div className="w-full h-[400px]">
          <DaumPostcodeEmbed
            onComplete={onComplete}
            style={{ height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressSearchModal;
