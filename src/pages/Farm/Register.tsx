import { useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import InputModal from '@/component/constants/InputModal';
import BottomSheetHeader from '@/component/farm/farmDetail/BottomSheetHeader';
import type { FarmDetailContext } from '@/pages/Farm/GrowthTraking';

import addfriend2 from '../../../src/assets/image/addfriend/addfriend2.png';

const Register = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { farmId } = useParams();
  const { farmInfo } = useOutletContext<FarmDetailContext>();

  const handleRegister = (deviceId: string) => {
    if (!deviceId.trim()) return;
    console.log('기기 등록 요청:', farmInfo.farmId, deviceId);
    // TODO: 기기 등록 API 연동 후 navigate
    navigate(`/farm/${farmId}`, { replace: true });
  };

  return (
    <div className="flex-1 flex flex-col items-center bg-[#E6E0D3]/50 rounded-t-[30px] pt-6 w-full">
      <BottomSheetHeader
        title="기기 미연동"
        description="아직 연동된 기기가 없어요!"
      />

      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-9 pb-12 animate-in fade-in duration-700">
        <img
          src={addfriend2}
          alt="기기 미연동"
          className="w-64 drop-shadow-md"
        />

        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-h-20b text-[#20110A]">연동된 기기가 없어요</p>
          <p className="text-c-12m text-[#20110A]/50 leading-relaxed">
            라즈베리파이를 등록하면{'\n'}실시간 농장 환경을 확인할 수 있어요
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full max-w-[280px] h-20 bg-[#20110A] text-white rounded-[14px] text-b-16sb active:scale-95 transition-transform shadow-lg"
        >
          기기 추가하기
        </button>
      </div>

      <InputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleRegister}
        title="기기 등록"
        description="라즈베리파이 뒷면의 8자리 번호를 입력해주세요!"
        placeholder="0000-0000"
        buttonText="등록하기"
      />
    </div>
  );
};

export default Register;
