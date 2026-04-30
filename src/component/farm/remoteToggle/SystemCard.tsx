import type { SystemConfig, SystemState } from '@/types/remoteControl';

import CharacterToggle from './CharacterToggle';

interface SystemCardProps {
  config: SystemConfig;
  state: SystemState;
  onToggle: () => void;
  onSlider: (value: number) => void;
}

const SystemCard = ({ config, state, onToggle, onSlider }: SystemCardProps) => (
  <div className="w-full bg-white rounded-[20px] px-5 py-4 shadow-sm">
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-[3px]">
        <span className="text-b-14b text-[#20110A]">{config.name}</span>
        <span className="text-c-12r text-[#8B8880]">{config.desc}</span>
      </div>
      <CharacterToggle isOn={state.isOn} onClick={onToggle} />
    </div>

    {/* 슬라이더 — 토글 상태와 무관하게 항상 표시 */}
    {config.hasSlider && (
      <div className="mt-4">
        <input
          type="range"
          min={0}
          max={100}
          value={state.value}
          onChange={(e) => onSlider(Number(e.target.value))}
          className="slider-green"
          style={{
            background: `linear-gradient(to right, #648E2E ${state.value}%, #D9D3C8 ${state.value}%)`,
          }}
        />
        <div className="flex justify-between mt-1">
          <span className="text-c-12m text-[#8B8880]">
            {config.sliderLabel}
          </span>
          <span className="text-c-12b text-[#20110A]">{state.value}%</span>
        </div>
      </div>
    )}
  </div>
);

export default SystemCard;
