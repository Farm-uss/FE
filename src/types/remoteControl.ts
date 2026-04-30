export interface SystemState {
  isOn: boolean;
  value: number;
}

export interface SystemConfig {
  id: string;
  name: string;
  desc: string;
  hasSlider: boolean;
  sliderLabel?: string;
}

export const SYSTEMS: SystemConfig[] = [
  {
    id: 'irrigation',
    name: '관개 시스템',
    desc: '토양 수분 공급',
    hasSlider: false,
  },
  { id: 'heating', name: '난방 시스템', desc: '온도 유지', hasSlider: false },
  {
    id: 'ventilation',
    name: '환기 시스템',
    desc: '공기 순환 제어',
    hasSlider: true,
    sliderLabel: '풍속',
  },
  {
    id: 'lighting',
    name: '조명 시스템',
    desc: 'LED 재배등 제어',
    hasSlider: true,
    sliderLabel: '밝기',
  },
];
