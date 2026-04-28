import { Icon } from '@iconify/react';

interface SensorCardProps {
  icon: string;
  label: string;
  value: string;
  range: string;
}

const SensorCard = ({ icon, label, value, range }: SensorCardProps) => {
  const currentValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const [min, max] = range.split('~').map((v) => parseFloat(v));
  const isOutOfRange = currentValue < min || currentValue > max;

  // value에서 숫자부분과 단위 분리 (예: "- mS/cm" → "-", "mS/cm")
  const parts = value.trim().split(' ');
  const numPart = parts[0]; // "-" 또는 "25"
  const unitPart = parts.slice(1).join(' '); // "mS/cm" 또는 "°C"

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
        {/* 숫자 + 단위 분리 표시 */}
        <div className="flex items-baseline gap-0.5">
          <span
            className={`text-h-18b leading-none ${isOutOfRange ? 'text-[#8E2E2E]' : 'text-[#20110A]'}`}
          >
            {numPart}
          </span>
          {unitPart && (
            <span
              className={`text-c-12m ${isOutOfRange ? 'text-[#8E2E2E]' : 'text-[#20110A]'}`}
            >
              {unitPart}
            </span>
          )}
        </div>
        <span className="text-c-10m text-[#20110A]/60 mt-1 whitespace-nowrap">
          최적 {range}
        </span>
      </div>
    </div>
  );
};

export default SensorCard;
