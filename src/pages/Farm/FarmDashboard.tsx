// src/pages/Farm/FarmDashboard.tsx
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Footer from '@/component/constants/Footer';
import InputModal from '@/component/constants/InputModal';
import LoadingSpinner from '@/component/constants/LoadingSpinner';
import BottomSheetHeader from '@/component/farm/farmDetail/BottomSheetHeader';
import SensorCard from '@/component/farm/farmDetail/SensorCard';
import { useFarmOptimalRange } from '@/hooks/useFarmOptimalRange';
import type { OptimalRangeSensor } from '@/types/farmService';

const SENSOR_ICONS: Record<string, string> = {
  temperature: 'material-symbols:thermometer',
  ph: 'material-symbols:science-outline',
  soilMoisture: 'material-symbols:water-drop',
  co2: 'material-symbols:co2',
  ec: 'material-symbols:electric-bolt-outline',
  illuminance: 'material-symbols:light-mode-outline',
};

const FarmDashboard = () => {
  const navigate = useNavigate();
  const { farmId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, loading } = useFarmOptimalRange(farmId);

  const sensors = data
    ? Object.entries(data)
        .filter(([key]) => key in SENSOR_ICONS)
        .map(([key, sensor]) => {
          const s = sensor as OptimalRangeSensor;
          return {
            icon: SENSOR_ICONS[key],
            label: s.label,
            value: `- ${s.unit}`,
            range: `${s.min}~${s.max}`,
          };
        })
    : [];

  const isError = false;

  const handleConfirmChange = (newDeviceId: string) => {
    console.log('새로운 기기 ID:', newDeviceId);
  };

  if (loading) return <LoadingSpinner message="대시보드 불러오는 중..." />;

  return (
    <div className="flex-1 flex flex-col items-center bg-[#E6E0D3]/50 rounded-t-[30px] pt-6 w-full">
      <BottomSheetHeader
        title={data ? `${data.cropName} 센서 대시보드` : '센서 대시보드'}
        description="실시간 농장 환경 데이터를 모니터링하세요."
      />

      {/* 시스템 상태 바 */}
      <div className="w-full px-9 mb-6">
        <div
          className={`${isError ? 'bg-[#8E2E2E]' : 'bg-[#648E2E]'} rounded-lg p-3 flex justify-between items-center transition-colors duration-300 w-full`}
        >
          <div className="flex items-center gap-2 text-white">
            <Icon
              icon={
                isError
                  ? 'material-symbols:error-outline-rounded'
                  : 'material-symbols:check-circle-outline-rounded'
              }
              className="text-[22px]"
            />
            <span className="text-c-12b">
              시스템 센서 {isError ? '작동 비정상' : '정상 작동중'}
            </span>
          </div>
          <span className="text-c-10m text-white/80">
            {isError
              ? '센서 작동에 오류가 있습니다.'
              : '모든 센서가 정상적으로 작동 중입니다.'}
          </span>
        </div>
      </div>

      {/* 센서 카드 그리드 */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-4 mb-8 justify-items-center px-9">
        {sensors.map((sensor, idx) => (
          <SensorCard key={idx} {...sensor} />
        ))}
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-3 mb-8 w-full px-9 items-center">
        <button
          onClick={() => navigate('remoteControl')}
          className="bg-[#6A8B23] w-full max-w-[320px] h-20 py-4 rounded-2xl text-white text-b-16b shadow-lg active:scale-95 transition-all"
        >
          수동제어 하러가기
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#20110A] w-full max-w-[320px] py-4 h-20 rounded-2xl text-white text-b-16b shadow-lg active:scale-95 transition-all"
        >
          기기변경 하러 가기
        </button>
      </div>

      <Footer />

      <InputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmChange}
        title="기기 변경"
        description="새로운 라즈베리파이 번호를 입력해주세요!"
        placeholder="8자리 기기 번호"
        buttonText="변경 완료"
      />
    </div>
  );
};

export default FarmDashboard;
