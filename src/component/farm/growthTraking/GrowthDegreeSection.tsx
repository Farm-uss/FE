import { Icon } from '@iconify/react';
import { useState } from 'react';

import GDDHelpModal from './GDDHelpModal';
import { InfoCard } from './InfoCard';

const GrowthDegreeSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('3일치');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const periods = ['3일치', '7일치', '31일치'];

  return (
    <div className="w-full mt-10 flex flex-col gap-6">
      <div className="flex items-center justify-center gap-1">
        <span className="text-b-14b text-[#20110A]">
          생장 도일을 활용한 예상 수확일
        </span>
        <button
          onClick={() => setIsHelpOpen(true)}
          className="active:opacity-50"
        >
          <Icon
            icon="material-symbols:help-outline"
            className="text-[#20110A]/60 text-3xl"
          />
        </button>
      </div>

      <div className="flex gap-3 w-full">
        <InfoCard label="목표 생장 도일" value="34일" />
        <InfoCard label="현재 생장 도일" value="17일" />
        <InfoCard label="예상 수확일" value="3월 9일" />
      </div>

      <div className="bg-white w-full h-[300px] rounded-[24px] shadow-sm" />

      <div className="flex gap-2 w-full justify-between">
        {periods.map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`flex-1 h-[36px] rounded-full text-c-12b transition-colors ${
              selectedPeriod === period
                ? 'bg-[#20110A] text-white'
                : 'bg-white text-[#20110A]'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      <GDDHelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
};

export default GrowthDegreeSection;
