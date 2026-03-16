import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useGDDData } from '@/hooks/useGDDData';

import GDDHelpModal from './GDDHelpModal';
import { InfoCard } from './InfoCard';

const GrowthDegreeSection = ({
  farmId,
  cropsId,
}: {
  farmId: number;
  cropsId: number;
}) => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null); // ✨ 스크롤 제어를 위한 Ref

  const { data, windowDays, setWindowDays, loading } = useGDDData(
    farmId,
    cropsId,
  );

  // 1. 데이터 전체 사용
  const displayData = data;

  // 2. 가로 길이 동적 계산 (데이터 1개당 60px 공간 확보)
  const chartWidth = Math.max(displayData.length * 60, 350);

  const lastData = data.length > 0 ? data[data.length - 1] : null;
  const currentGDD = lastData ? lastData.gddCumulative.toFixed(1) : '0';

  const maxVal =
    data.length > 0 ? Math.max(...data.map((d) => d.gddCumulative)) : 100;
  const minVal =
    data.length > 0 ? Math.min(...data.map((d) => d.gddCumulative)) : 0;

  // ✨ 로딩 완료 후 스크롤을 가장 오른쪽(최신 데이터)으로 밀어주기
  useEffect(() => {
    if (scrollRef.current && !loading) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [loading, data]);

  const periods = [
    { label: '3일 간격', value: 3 },
    { label: '7일 간격', value: 7 },
    { label: '31일 간격', value: 31 },
  ];

  return (
    <div className="w-full mt-10 flex flex-col gap-6">
      <div className="flex items-center justify-center gap-1">
        <span className="text-b-14b text-[#20110A]">누적 생장 도일 추이</span>
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
        <InfoCard label="목표 생장 도일" value="500일" />
        <InfoCard label="현재 누적 도일" value={`${currentGDD}일`} />
        <InfoCard label="예상 수확일" value="3월 25일" />
      </div>

      {/* 그래프 영역 */}
      <div className="bg-white w-full h-[320px] rounded-[24px] shadow-sm relative flex flex-col p-3">
        {loading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10 rounded-[24px]">
            <p className="animate-pulse font-bold text-[#648E2E]">
              데이터 로드 중...
            </p>
          </div>
        )}

        {/* ✨ 가로 스크롤 컨테이너 (스크롤바 숨김 처리 필요) */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-x-auto overflow-y-hidden select-none"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* ✨ 데이터 개수에 따라 가로가 늘어나는 내부 div */}
          <div style={{ width: `${chartWidth}px`, height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={displayData}
                margin={{ top: 20, right: 5, left: 20, bottom: 10 }}
              >
                <defs>
                  <linearGradient
                    id="colorCumulative"
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
                  dataKey="to"
                  tick={{ fontSize: 10, fill: '#AAA' }}
                  axisLine={false}
                  tickLine={false}
                  interval={0} // 공간이 넉넉하므로 모든 날짜 표시
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
                  tickFormatter={(val) => Math.floor(val).toString()}
                  domain={[Math.floor(minVal * 0.95), Math.ceil(maxVal * 1.05)]}
                  width={35}
                  orientation="right"
                  label={{
                    value: 'GDD',
                    angle: 0,
                    position: 'top',
                    offset: 10, // 축 위로 살짝 띄우기
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
                  labelFormatter={(label) => `${label} 누적`}
                />
                <Area
                  type="monotone"
                  dataKey="gddCumulative"
                  stroke="#648E2E"
                  fillOpacity={1}
                  fill="url(#colorCumulative)"
                  strokeWidth={3}
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 기간 선택 버튼 */}
      <div className="flex gap-2 w-full justify-between mb-4">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => setWindowDays(period.value)}
            className={`flex-1 h-[38px] rounded-full text-c-12b transition-all duration-300 ${
              windowDays === period.value
                ? 'bg-[#20110A] text-white shadow-md'
                : 'bg-white text-[#20110A] border border-[#F0F0F0]'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      <GDDHelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
};

export default GrowthDegreeSection;
