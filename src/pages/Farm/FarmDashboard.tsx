import { Icon } from '@iconify/react';
import { useState } from 'react'; // ✨ 추가

import Footer from '@/component/constants/Footer';
import InputModal from '@/component/constants/InputModal'; // ✨ 아까 만든 모달 임포트
import BottomSheetHeader from '@/component/farm/farmDetail/BottomSheetHeader';
import SensorCard from '@/component/farm/farmDetail/SensorCard';

const FarmDashboard = () => {
  // ✨ 모달 열림 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // ✨ 기기 변경 확인 버튼을 눌렀을 때 실행될 함수
  const handleConfirmChange = (newDeviceId: string) => {
    console.log('새로운 기기 ID:', newDeviceId);
    // 🚀 여기서 백엔드 PATCH API 등을 쏴서 기기 정보를 업데이트하면 돼!
    alert(`기기 번호가 ${newDeviceId}로 성공적으로 변경되었어, 동열이형!`);
  };

  return (
    <div className="flex-1 flex flex-col items-center bg-[#E6E0D3]/50 rounded-t-[30px] pt-6 w-full">
      <BottomSheetHeader
        title="센서 대쉬보드"
        description="실시간 농장 환경 데이터를 모니터링하세요."
      />

      {/* 시스템 상태 바 */}
      <div className="w-full px-9 mb-6">
        {' '}
        {/* 디자인 정렬을 위해 감싸는 div 추가 */}
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
          className={`${hasSensorError ? 'bg-[#8B2323]' : 'bg-[#6A8B23]'} w-full max-w-[320px] h-20 py-4 rounded-2xl text-white text-b-16b shadow-lg active:scale-95 transition-all`}
        >
          수동제어 하러가기
        </button>

        {/* 기기변경 버튼 */}
        <button
          onClick={() => setIsModalOpen(true)} // ✨ 클릭 시 모달 열기
          className={`bg-[#20110A] w-full max-w-[320px] py-4 h-20 rounded-2xl text-white text-b-16b shadow-lg active:scale-95 transition-all`}
        >
          기기변경 하러 가기
        </button>
      </div>

      <Footer />

      {/* ✨ 기기변경 입력 모달 추가 */}
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
