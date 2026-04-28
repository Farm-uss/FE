import { useGDDSummary } from '@/hooks/useGDDSummary';

import { InfoCard } from './InfoCard';

interface Props {
  farmId: number;
  cropsId: number;
}

const GDDSummaryCards = ({ farmId, cropsId }: Props) => {
  const { data, loading } = useGDDSummary(farmId, cropsId);

  if (loading) {
    return (
      <div className="flex gap-3 w-full">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex-1 bg-white rounded-[20px] h-[88px] animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-3 w-full">
      <InfoCard
        label="목표 GDD"
        value={data?.targetGdd ? `${data.targetGdd}` : '-'}
      />
      <InfoCard
        label="현재 누적 GDD"
        value={data?.currentGdd ? `${data.currentGdd.toFixed(1)}` : '-'}
      />
      <InfoCard
        label="예상 수확일"
        value={data?.expectedHarvestDate ?? '미정'}
      />
    </div>
  );
};

export default GDDSummaryCards;
