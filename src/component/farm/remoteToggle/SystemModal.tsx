import characterDevice from '@/assets/image/RemoteControl/chjaracterDevice.svg';

interface SystemModalProps {
  name: string;
  isOn: boolean;
  onClose: () => void;
}

const SystemModal = ({ name, isOn, onClose }: SystemModalProps) => (
  <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-8 backdrop-blur-sm animate-fadeIn">
    <div className="bg-[#E8E2D5] w-full max-w-[360px] rounded-[40px] px-12 py-30 flex flex-col items-center gap-12 shadow-2xl">
      <div className="w-60 h-60 flex items-center justify-center">
        <img
          src={characterDevice}
          alt="character"
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-h-24b text-[#20110A] text-center break-keep">
        {name}을{' '}
        <span className={isOn ? 'text-[#648E2E]' : 'text-[#E05C2A]'}>
          {isOn ? '작동' : '종료'}
        </span>{' '}
        했습니다!
      </h3>
      <button
        onClick={onClose}
        className="w-full h-[56px] bg-[#20110A] text-white rounded-full text-b-16b active:scale-95 transition-all shadow-lg"
      >
        확인
      </button>
    </div>
  </div>
);

export default SystemModal;
