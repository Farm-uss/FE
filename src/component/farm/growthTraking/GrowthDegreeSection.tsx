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

import LoadingSpinner from '@/component/constants/LoadingSpinner';
import { useGDDData } from '@/hooks/useGDDData';

import GrowthTrackingGdd from '../../../../src/assets/image/growthTraking/growthTrackingGdd.svg';
import GDDHelpModal from './GDDHelpModal';
import GDDSummaryCards from './GDDSummaryCards';

const GrowthDegreeSection = ({
  farmId,
  cropsId,
}: {
  farmId: number;
  cropsId: number;
}) => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, windowDays, setWindowDays, loading } = useGDDData(
    farmId,
    cropsId,
  );

  const displayData = data;
  const chartWidth = useMemo(() => Math.max(data.length * 60, 350), [data]);

  const maxVal = useMemo(
    () =>
      data.length > 0 ? Math.max(...data.map((d) => d.gddCumulative)) : 100,
    [data],
  );
  const minVal = useMemo(
    () => (data.length > 0 ? Math.min(...data.map((d) => d.gddCumulative)) : 0),
    [data],
  );

  // 로딩 완료 후 + windowDays가 선택되었을 때만 스크롤 제어
  useEffect(() => {
    if (scrollRef.current && !loading && windowDays) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [loading, data, windowDays]);

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

      <GDDSummaryCards farmId={farmId} cropsId={cropsId} />

      <div className="bg-white w-full h-[320px] rounded-[24px] shadow-sm relative flex flex-col p-5 overflow-hidden">
        {/* 1. 초기 안내 상태: windowDays가 선택되지 않았을 때 */}
        {!windowDays && !loading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 animate-in fade-in duration-700">
            <div className="flex items-center justify-center">
              <img src={GrowthTrackingGdd} alt="안내 이미지" />
            </div>
            <div className="text-center">
              <p className="text-b-16b text-[#20110A]">
                성장 추이를 확인해보세요!
              </p>
              <p className="text-c-12m text-[#20110A]/50 mt-1">
                아래 버튼을 눌러 분석 간격을 선택해주세요.
              </p>
            </div>
          </div>
        ) : loading ? (
          /* 2. 로딩 상태: 데이터 요청 중일 때 */
          <LoadingSpinner
            message="최신 데이터 분석 중..."
            fullScreen={false}
            bgColor="bg-white"
          />
        ) : displayData.length === 0 ? (
          /* 3. 데이터 없음 상태: 로딩은 끝났는데 데이터가 텅 비었을 때 */
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
          /* 4. 그래프 표시 상태: 데이터가 존재할 때 */
          <div
            ref={scrollRef}
            className="flex-1 overflow-x-auto hide-scrollbar select-none"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div style={{ width: `${chartWidth}px`, height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={displayData}
                  margin={{ top: 30, right: 25, left: 15, bottom: 10 }}
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
                    tickFormatter={(val) => Math.floor(val).toString()}
                    domain={[
                      Math.floor(minVal * 0.95),
                      Math.ceil(maxVal * 1.05),
                    ]}
                    width={20}
                    orientation="right"
                    label={{
                      value: 'GDD',
                      dx: 12, // 축 위로 정확히 맞춤
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
        )}
      </div>

      {/* 기간 선택 버튼 */}
      <div className="flex gap-2 w-full justify-between mb-4">
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

      <GDDHelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
};

export default GrowthDegreeSection;
