import { Icon } from '@iconify/react';

interface SensorCardProps {
  icon: string;
  label: string;
  value: string;
  range: string;
}

const SensorCard = ({ icon, label, value, range }: SensorCardProps) => {
  // 1. 숫자만 추출하는 함수
  const currentValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const [min, max] = range.split('~').map((v) => parseFloat(v));

  // 2. 범위를 벗어났는지 확인 (미달이거나 초과일 때)
  const isOutOfRange = currentValue < min || currentValue > max;

  return (
    <div className="bg-white rounded-[16px] w-[175px] h-[90px] flex items-center shadow-sm p-4 shrink-0">
      <div className="flex flex-col items-center justify-center gap-1 w-[60px] shrink-0">
        <Icon icon={icon} className="text-[24px] text-[#20110A]" />
        <span className="text-c-12b text-[#20110A] whitespace-nowrap">
          {label}
        </span>
      </div>

      <div
        className={`rounded-[16px] flex-1 h-full flex flex-col items-center justify-center ml-1 transition-colors duration-300 ${
          isOutOfRange ? 'bg-[#FEE2E2]' : 'bg-[#E6E0D3]'
        }`}
      >
        <span
          className={`text-h-24b leading-none ${isOutOfRange ? 'text-[#8E2E2E]' : 'text-[#20110A]'}`}
        >
          {value}
        </span>
        <span className="text-c-10m text-[#20110A]/60 mt-1 whitespace-nowrap">
          최적 {range}
        </span>
      </div>
    </div>
  );
};

export default SensorCard;
