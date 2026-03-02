import { AccordionItem } from './AccordionItem ';

interface Props {
  diseaseName: string;
}

const DiseaseDetailSection = ({ diseaseName }: Props) => {
  return (
    <div className="w-full flex flex-col gap-8 mt-10 pb-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      {/* --- 신뢰도바 --- */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-b-16b text-[#20110A]">
          <span>신뢰도</span>
          <span>90%</span>
        </div>
        <div className="w-full h-5 bg-white rounded-full overflow-hidden border border-[#20110A]/10">
          <div className="h-full bg-[#20110A] rounded-full w-[90%]" />
        </div>
      </div>

      {/* --- 질병 요약 --- */}
      <div className="flex flex-col gap-5">
        <h3 className="text-h-20b text-[#20110A]">{diseaseName}?</h3>
        <p className="text-b-14m text-[#20110A] leading-relaxed  decoration-2 underline-offset-4">
          잎마름병은 곰팡이나 세균에 의해 잎의 가장자리부터 갈색으로 타들어가며
          점차 말라 죽는 병이에요. 적절한 조치를 취하지 않으면 식물 전체의
          성장이 멈추고 수확량이 크게 줄어들 수 있어요.
        </p>
      </div>

      {/* --- 아코디언 섹션들 --- */}
      <div className="flex flex-col gap-10">
        <AccordionItem
          title="왜 발생 했나요 ?"
          contents={[
            '습도가 너무 높거나 공기 순환이 원활하지 않을 때 자주 발생해요.',
            '습도가 너무 높거나 공기 순환이 원활하지 않을 때 자주 발생해요.',
            '습도가 너무 높거나 공기 순환이 원활하지 않을 때 자주 발생해요.',
            '습도가 너무 높거나 공기 순환이 원활하지 않을 때 자주 발생해요.',
            '습도가 너무 높거나 공기 순환이 원활하지 않을 때 자주 발생해요.',
          ]}
        />
        <AccordionItem
          title="걸리면 어떤 증상이 보이나요?"
          contents={[
            '잎 가장자리에 황갈색의 작은 반점이 생겨요.',
            '잎 가장자리에 황갈색의 작은 반점이 생겨요.',
            '잎 가장자리에 황갈색의 작은 반점이 생겨요.',
            '잎 가장자리에 황갈색의 작은 반점이 생겨요.',
            '잎 가장자리에 황갈색의 작은 반점이 생겨요.',
          ]}
        />
        <AccordionItem
          title="어떻게 해결 하나요?"
          contents={[
            '이미 마른 잎은 다른 곳으로 번지지 않게 즉시 잘라내어 멀리 버려주세요.',
            '이미 마른 잎은 다른 곳으로 번지지 않게 즉시 잘라내어 멀리 버려주세요.',
            '이미 마른 잎은 다른 곳으로 번지지 않게 즉시 잘라내어 멀리 버려주세요.',
            '이미 마른 잎은 다른 곳으로 번지지 않게 즉시 잘라내어 멀리 버려주세요.',
            '이미 마른 잎은 다른 곳으로 번지지 않게 즉시 잘라내어 멀리 버려주세요.',
          ]}
        />
      </div>
    </div>
  );
};

// 재사용 가능한 아코디언 아이템 컴포넌트

export default DiseaseDetailSection;
