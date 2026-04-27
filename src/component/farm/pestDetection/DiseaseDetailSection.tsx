import type { VisionInferenceData } from '@/types/farmService';

import { AccordionItem } from './AccordionItem';

interface Props {
  data: VisionInferenceData;
}

const DiseaseDetailSection = ({ data }: Props) => {
  const confidencePercent = `${data.confidence}%`;

  return (
    <div className="w-full flex flex-col gap-8 mt-10 pb-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-b-16b text-[#20110A]">
          <span>신뢰도</span>
          <span>{confidencePercent}</span>
        </div>
        <div className="w-full h-5 bg-white rounded-full overflow-hidden border border-[#20110A]/10">
          <div
            className="h-full bg-[#20110A] rounded-full transition-all duration-1000 ease-out"
            style={{ width: confidencePercent }}
          />
        </div>
      </div>

      {/* --- 질병 요약 --- */}
      <div className="flex flex-col gap-5">
        <h3 className="text-h-20b text-[#20110A]">{data.diseaseName}?</h3>
        <p className="text-b-14m text-[#20110A] leading-relaxed decoration-2 underline-offset-4">
          {data.diseaseDescription}
        </p>
      </div>

      <div className="flex flex-col gap-10">
        <AccordionItem title="왜 발생 했나요 ?" contents={data.causes} />
        <AccordionItem
          title="걸리면 어떤 증상이 보이나요?"
          contents={data.symptoms}
        />
        <AccordionItem title="어떻게 해결 하나요?" contents={data.solutions} />
      </div>
    </div>
  );
};

export default DiseaseDetailSection;
