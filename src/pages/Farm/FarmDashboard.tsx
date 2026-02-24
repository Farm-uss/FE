import { Icon } from '@iconify/react';

import Footer from '@/component/constants/Footer';
import SensorCard from '@/component/farm/farmDetail/SensorCard';

const FarmDashboard = () => {
  // 임시 데이터. 나중에 API로 연동
  const sensors = [
    {
      icon: 'material-symbols:thermometer',
      label: '온도',
      value: "25'C",
      range: '22~27',
    },
    {
      icon: 'material-symbols:water-drop',
      label: '토양 수분',
      value: '18%',
      range: '22~27',
    },
    {
      icon: 'material-symbols:nutrition',
      label: '토양 영양분',
      value: '25%',
      range: '22~27',
    },
    {
      icon: 'material-symbols:humidity-mid',
      label: '습도',
      value: '25%',
      range: '22~27',
    },
    {
      icon: 'material-symbols:humidity-mid',
      label: '습도',
      value: '25%',
      range: '22~27',
    },
    {
      icon: 'material-symbols:humidity-mid',
      label: '습도',
      value: '25%',
      range: '22~27',
    },
  ];
  const hasSensorError = sensors.some((sensor) => {
    const currentValue = parseFloat(sensor.value.replace(/[^0-9.]/g, ''));
    const [min, max] = sensor.range.split('~').map((v) => parseFloat(v));
    return currentValue < min || currentValue > max;
  });

  const isError = false; // 에러 상태 테스트용

  return (
    <div className="flex-1 flex flex-col items-center bg-[#E6E0D3]/50 rounded-t-[30px] pt-6  w-full">
      {/* 상단 핸들 바 */}
      <div className="w-12 h-1 bg-[#8B8880]/40 rounded-full mx-auto mb-4" />

      <div className="text-center mb-6">
        <h2 className="text-b-16b text-[#20110A]">센서 대쉬보드</h2>
        <p className="text-c-10m text-[#20110A]/60 mt-1">
          실시간 농장 환경 데이터를 모니터링하세요.
        </p>
      </div>

      {/* 시스템 상태 바 */}
      <div
        className={`${isError ? 'bg-[#8E2E2E]' : 'bg-[#648E2E]'} rounded-lg p-3 flex justify-between items-center mb-6 transition-colors duration-300 w-full`}
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

      {/* 센서 카드 그리드 */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-4 mb-8 justify-items-center">
        {sensors.map((sensor, idx) => (
          <SensorCard key={idx} {...sensor} />
        ))}
      </div>

      {/* 수동제어 버튼 */}
      <button
        className={`${
          hasSensorError ? 'bg-[#8B2323]' : 'bg-[#6A8B23]'
        } w-100 h-20 py-4 rounded-2xl text-white text-b-16b shadow-lg active:scale-95 transition-all mb-4`}
      >
        수동제어 하러가기
      </button>
      <Footer />
    </div>
  );
};

export default FarmDashboard;
