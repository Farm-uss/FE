import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import Footer from '@/component/constants/Footer';
import BottomSheetHeader from '@/component/farm/farmDetail/BottomSheetHeader';
import SystemCard from '@/component/farm/remoteToggle/SystemCard';
import SystemModal from '@/component/farm/remoteToggle/SystemModal';
import type { SystemState } from '@/types/remoteControl';
import { SYSTEMS } from '@/types/remoteControl';

import type { FarmDetailContext } from './GrowthTraking';

const RemoteControl = () => {
  const navigate = useNavigate();
  useOutletContext<FarmDetailContext>();

  const [systems, setSystems] = useState<Record<string, SystemState>>(
    Object.fromEntries(SYSTEMS.map((s) => [s.id, { isOn: false, value: 60 }])),
  );
  const [modal, setModal] = useState<{ name: string; isOn: boolean } | null>(
    null,
  );

  const handleToggle = (id: string, name: string) => {
    const next = !systems[id].isOn;
    setSystems((prev) => ({ ...prev, [id]: { ...prev[id], isOn: next } }));
    setModal({ name, isOn: next });
  };

  const handleSlider = (id: string, value: number) => {
    setSystems((prev) => ({ ...prev, [id]: { ...prev[id], value } }));
  };

  return (
    <div className="flex-1 flex flex-col items-center bg-[#E6E0D3]/50 rounded-t-[30px] pt-6 px-6 pb-6 w-full overflow-y-auto scroll">
      <BottomSheetHeader
        title="수동제어"
        description="직접 농장을 제어해보세요!"
      />

      <div className="w-full flex flex-col gap-4 mb-8">
        {SYSTEMS.map((sys) => (
          <SystemCard
            key={sys.id}
            config={sys}
            state={systems[sys.id]}
            onToggle={() => handleToggle(sys.id, sys.name)}
            onSlider={(v) => handleSlider(sys.id, v)}
          />
        ))}
      </div>

      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => navigate(-1)}
        className="w-full h-[54px] rounded-[16px] bg-[#20110A] text-white text-b-16b active:scale-95 transition-all mb-4"
      >
        뒤로 가기
      </button>
      <Footer />

      {modal && (
        <SystemModal
          name={modal.name}
          isOn={modal.isOn}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
};

export default RemoteControl;
