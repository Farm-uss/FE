import { Icon } from '@iconify/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import noGraphImg from '@/assets/image/growthTraking/noGraph.svg';
import LoadingSpinner from '@/component/constants/LoadingSpinner';
import { useGrowthMetrics } from '@/hooks/useGrowthMetrics';
import type { GrowthMetricType } from '@/types/farmService';

const METRIC_MAP: Record<string, GrowthMetricType> = {
  '잎의 갯수': 'LEAF_COUNT',
  '열매 갯수': 'FRUIT_COUNT',
  '작물 크기': 'SIZE_CM',
};

const UNIT_MAP: Record<GrowthMetricType, string> = {
  LEAF_COUNT: '개',
  FRUIT_COUNT: '개',
  SIZE_CM: 'cm',
  HEIGHT_CM: 'cm',
};

const formatValue = (value: number, metric: GrowthMetricType) => {
  if (metric === 'SIZE_CM' || metric === 'HEIGHT_CM') {
    return value.toFixed(1);
  }
  return Math.floor(value).toString();
};

interface GrowthChartSectionProps {
  farmId: number;
  cropsId: number;
}

const GrowthChartSection = ({ farmId, cropsId }: GrowthChartSectionProps) => {
  const [selectedType, setSelectedType] = useState('잎의 갯수');
  const [windowDays, setWindowDays] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const types = ['잎의 갯수', '열매 갯수', '작물 크기'];
  const periods = [
    { label: '3일 간격', value: 3 },
    { label: '7일 간격', value: 7 },
    { label: '31일 간격', value: 31 },
  ];

  const metric = METRIC_MAP[selectedType];
  const unit = UNIT_MAP[metric];

  const { data, loading } = useGrowthMetrics(
    farmId,
    cropsId,
    metric,
    windowDays,
  );

  const chartWidth = useMemo(() => Math.max(data.length * 60, 350), [data]);
  const maxVal = useMemo(
    () => (data.length > 0 ? Math.max(...data.map((d) => d.value)) : 100),
    [data],
  );
  const minVal = useMemo(
    () => (data.length > 0 ? Math.min(...data.map((d) => d.value)) : 0),
    [data],
  );

  useEffect(() => {
    if (scrollRef.current && !loading && windowDays) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [loading, data, windowDays]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 타입 선택 */}
      <div className="flex gap-2 w-full justify-between">
        {types.map((typeName) => (
          <button
            key={typeName}
            onClick={() => {
              setSelectedType(typeName);
              setWindowDays(null);
            }}
            className={`flex-1 h-[36px] rounded-full text-c-12b transition-colors ${
              selectedType === typeName
                ? 'bg-[#20110A] text-white'
                : 'bg-white text-[#20110A]'
            }`}
          >
            {typeName}
          </button>
        ))}
      </div>

      {/* 차트 영역 */}
      <div className="bg-white w-full h-[300px] rounded-[24px] p-5 flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
        {!windowDays && !loading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 animate-in fade-in duration-700">
            <img src={noGraphImg} alt="No Data" />
            <div className="text-center">
              <p className="text-b-14b text-[#20110A]">
                내 작물의 성장을 확인해보세요!
              </p>
              <p className="text-c-12m text-[#20110A]/50 mt-1">
                아래 버튼을 눌러 분석 간격을 선택해주세요.
              </p>
            </div>
          </div>
        ) : loading ? (
          <LoadingSpinner
            message="데이터 불러오는 중..."
            fullScreen={false}
            bgColor="bg-white"
          />
        ) : data.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 animate-in fade-in duration-500">
            <Icon
              icon="tabler:database-x"
              className="text-5xl text-[#20110A]/10"
            />
            <div className="text-center">
              <p className="text-b-14b text-[#20110A]/60">
                표시할 데이터가 없어요
              </p>
              <p className="text-c-12m text-[#20110A]/30 mt-1">
                작물을 등록한 지 얼마 안 되었을 수 있습니다.
              </p>
            </div>
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex-1 w-full overflow-x-auto hide-scrollbar select-none"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div style={{ width: `${chartWidth}px`, height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 30, right: 25, left: 15, bottom: 10 }}
                >
                  <defs>
                    <linearGradient
                      id="colorGrowth"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#648E2E" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#648E2E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#F5F5F5"
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: '#AAA' }}
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                    tickMargin={10}
                    tickFormatter={(str) => {
                      const d = str.split('-');
                      return `${d[1]}/${d[2]}`;
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#AAA' }}
                    tickFormatter={(val) => formatValue(val, metric)}
                    domain={[
                      Math.floor(minVal * 0.95),
                      Math.ceil(maxVal * 1.05),
                    ]}
                    width={20}
                    orientation="right"
                    label={{
                      value: unit,
                      dx: 12,
                      angle: 0,
                      position: 'top',
                      offset: 15,
                      fill: '#AAA',
                      fontSize: 10,
                      fontWeight: 'bold',
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '15px',
                      border: 'none',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    }}
                    formatter={(value) => {
                      if (value === undefined || value === null)
                        return ['', selectedType];
                      return [
                        `${formatValue(Number(value), metric)}${unit}`,
                        selectedType,
                      ];
                    }}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#648E2E"
                    fillOpacity={1}
                    fill="url(#colorGrowth)"
                    strokeWidth={3}
                    animationDuration={1000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* 기간 선택 */}
      <div className="flex gap-2 w-full justify-between">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => setWindowDays(period.value)}
            className={`flex-1 h-[38px] rounded-full text-c-12b transition-all duration-300 ${
              windowDays === period.value
                ? 'bg-[#20110A] text-white shadow-md scale-105'
                : 'bg-white text-[#20110A] border border-[#F0F0F0]'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GrowthChartSection;
