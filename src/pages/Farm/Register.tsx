import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BottomSheetHeader from '@/component/farm/farmDetail/BottomSheetHeader';

import deviceChar from '../../../src/assets/image/RemoteControl/chjaracterDevice.svg';

const Register = () => {
  const [deviceNumber, setDeviceNumber] = useState('');
  const navigate = useNavigate();
  const { farmId } = useParams();

  const handleRegister = () => {
    if (!deviceNumber.trim()) {
      alert('번호를 입력해줘');
      return;
    }

    alert('기기 등록이 완료했습니다.');

    navigate(`/farm/${farmId}`, { replace: true });
  };

  return (
    <div className="flex-1 flex flex-col items-center bg-[#E6E0D3]/50 rounded-t-[30px] py-6 px-9 w-full gap-6 scroll">
      <BottomSheetHeader
        title="기기 등록"
        description="기기를 등록하고 내 농장을 확인하세요!"
      />

      <div className="flex-1 w-full flex flex-col items-center justify-center gap-8 animate-in fade-in duration-700">
        <div className="flex flex-col items-center gap-2">
          <p className="text-h-20b text-[#20110A]">
            라즈베리파이 번호를 입력해주세요!
          </p>
          <p className="text-c-12m text-[#20110A]/50">
            기기 뒷면의 8자리 숫자를 확인해주세요!
          </p>
        </div>

        <img src={deviceChar} alt="기기 캐릭터" className="drop-shadow-md" />

        <div className="w-full max-w-[280px] flex flex-col gap-4">
          <input
            type="text"
            value={deviceNumber}
            onChange={(e) => setDeviceNumber(e.target.value)}
            placeholder="0000-0000"
            className="w-full h-14 bg-white rounded-[14px] px-5 text-center text-h-20b text-[#20110A] outline-none border-2 border-transparent focus:border-[#20110A] transition-all shadow-sm placeholder:text-[#20110A]/20"
          />
          <button
            onClick={handleRegister}
            className="w-full h-14 bg-[#20110A] text-white rounded-[14px] text-b-16sb active:scale-95 transition-transform shadow-lg"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
