import { useState } from 'react';

import noGraphImg from '@/assets/image/growthTraking/noGraph.svg';

const GrowthChartSection = () => {
  const [selectedType, setSelectedType] = useState('잎의 갯수');
  const [selectedPeriod, setSelectedPeriod] = useState('3일치');
  const types = ['잎의 갯수', '열매 갯수', '작물 크기'];
  const periods = ['3일치', '7일치', '31일치'];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex gap-2 w-full justify-between">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`flex-1 h-[36px] rounded-full text-c-12b transition-colors ${
              selectedType === type
                ? 'bg-[#20110A] text-white'
                : 'bg-white text-[#20110A]'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="bg-white w-full rounded-[24px] p-8 h-[300px] flex flex-col items-center justify-center gap-4 shadow-sm">
        <img src={noGraphImg} alt="No Data" />
        <p className="text-b-14b text-[#20110A]">
          내 작물의 성장을 확인해보세요!
        </p>
      </div>

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
    </div>
  );
};

export default GrowthChartSection;
