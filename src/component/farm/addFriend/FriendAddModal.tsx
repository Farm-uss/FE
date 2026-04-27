import type { AxiosError } from 'axios';
import { useState } from 'react';

import api from '@/apis/axios';
import addFriendImg from '@/assets/image/addfriend/addfriend.png';
import addFriend2Img from '@/assets/image/addfriend/addfriend2.png';
import plusImg from '@/assets/image/addfriend/plus.png';
import shadowImg from '@/assets/image/addfriend/shadow.png';
import shadow2Img from '@/assets/image/addfriend/shadow2.png';

interface FriendAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmId: number;
  onSuccess?: () => void;
}

const FriendAddModal = ({
  isOpen,
  onClose,
  farmId,
  onSuccess,
}: FriendAddModalProps) => {
  const [notFound, setNotFound] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // 추가
  if (!isOpen) return null;

  const handleAddClick = async () => {
    if (!email.trim() || loading) return; // loading 중엔 중복 클릭 차단

    try {
      setLoading(true); // 추가
      const response = await api.post(`/farms/${farmId}/members`, {
        email: email.trim(),
      });

      if (response.status === 200) {
        if (onSuccess) onSuccess();
        handleClose();
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('친구 추가 실패:', axiosError);
      setNotFound(true);
    } finally {
      setLoading(false); // 추가
    }
  };

  const handleClose = () => {
    setNotFound(false);
    setEmail('');
    setLoading(false); // 추가
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 클릭 시 닫기 */}
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      <div className="relative w-[344px] h-[291px] bg-[#F2F2F2] rounded-[16px] px-6 pt-8 pb-6 z-10 shadow-xl flex flex-col justify-between">
        <div className="relative flex items-center justify-center">
          <h2 className="text-[18px] font-bold text-[#2A160C]">
            친구 추가하기
          </h2>
          <button
            onClick={handleClose}
            className="absolute right-4 text-[20px] text-[#2A160C]"
          >
            ✕
          </button>
        </div>

        {/* 결과에 따른 일러스트 표시 */}
        {!notFound ? (
          <div className="flex flex-col items-center -mt-2">
            <img src={addFriendImg} alt="friends" className="w-[250px]" />
            <img src={shadowImg} alt="shadow" className="w-[290px] -mt-6" />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-[14px] text-[#2A160C] mt-1 mb-1">
              친구를 찾을 수 없습니다.
            </p>
            <img
              src={addFriend2Img}
              alt="notfound"
              className="w-[100px] mt-2"
            />
            <img src={shadow2Img} alt="shadow2" className="w-[130px] -mt-5" />
          </div>
        )}

        {/* 이메일 입력 및 추가 버튼 */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (notFound) setNotFound(false); // 입력 시작하면 에러 메시지 초기화
            }}
            placeholder="친구의 메일 주소를 적어주세요."
            className="flex-1 h-[54px] bg-[#E7E1D8] border-2 border-dashed border-[#3A1F0F] rounded-[8px] px-5 text-[14px] outline-none"
          />
          <button
            onClick={handleAddClick}
            disabled={loading} // 추가
            className="w-[70px] h-[54px] flex items-center justify-center active:scale-95 transition-transform disabled:opacity-50" // disabled 스타일 추가
          >
            <img
              src={plusImg}
              alt="add"
              className="w-[70px] h-[54px] object-cover"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendAddModal;
