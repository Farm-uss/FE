import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✨ 추가

import CommonModal from '@/component/constants/CommonModal';

import basicFarmImg from '../../../public/icons/farmBasicImg.svg';

interface Step3Props {
  onPrev: () => void;
}
// ... (상단 import 동일)

const Step3 = ({ onPrev }: Step3Props) => {
  const navigate = useNavigate();
  const nickname = localStorage.getItem('nickname');
  const [showModal, setShowModal] = useState(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [isDefault, setIsDefault] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGoHome = () => {
    setShowModal(false);
    navigate('/home');
  };

  const handleBoxClick = () => {
    // ✨ 핵심: 파일을 새로 고를 때마다 인풋 값을 초기화해줘야
    // 같은 파일을 다시 선택해도 onChange가 정상적으로 터져!
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (isDefault) {
      setIsDefault(false);
      setTimeout(() => fileInputRef.current?.click(), 10);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // ✨ 사진 데이터가 확실히 로드된 후 상태 업데이트
        setPreviewImg(reader.result as string);
        setIsDefault(false); // 기본 이미지 모드 강제 해제
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDefault = () => {
    const nextDefault = !isDefault;
    setIsDefault(nextDefault);
    // ✨ 기본 이미지를 켤 때만 미리보기를 날려야 꼬이지 않아.
    if (nextDefault) {
      setPreviewImg(null);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center animate-fadeIn px-6 text-center">
      <div className="flex-1 w-full flex flex-col items-center justify-center gap-8">
        <div className="text-h-20b text-[#20110A]">
          농장 이미지를 넣어주세요.
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* 렌더링 조건문을 더 명확하게 수정했어! */}
        <div
          onClick={handleBoxClick}
          className={`w-full h-[260px] bg-[#E8E2D5] rounded-[50px] flex items-center justify-center shadow-inner overflow-hidden transition-all relative ${
            !isDefault
              ? 'cursor-pointer active:scale-95 border-2 border-dashed border-[#20110A]/20'
              : ''
          }`}
        >
          {/* 1순위: 기본 이미지 모드일 때 */}
          {isDefault ? (
            <img
              src={basicFarmImg}
              alt="기본"
              className="w-full h-full object-cover scale-110"
            />
          ) : (
            <>
              {/* 2순위: 업로드한 미리보기가 있을 때 */}
              {previewImg ? (
                <img
                  src={previewImg}
                  alt="미리보기"
                  className="w-full h-full object-cover animate-fadeIn"
                />
              ) : (
                /* 3순위: 아무것도 없을 때 (가이드) */
                <div className="flex flex-col items-center gap-2">
                  <Icon
                    icon="material-symbols:imagesmode-outline-sharp"
                    className="text-[75px] text-[#20110A]/40"
                  />
                  <span className="text-c-12m text-[#20110A]/40 font-medium">
                    이미지 선택하기
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        <div
          onClick={toggleDefault}
          className="bg-[#E8E2D5] w-full h-[80px] rounded-[40px] flex items-center justify-between px-8 cursor-pointer active:scale-[0.98] transition-all"
        >
          <span className="text-b-16m text-[#20110A]">
            기본 이미지로 만들기
          </span>
          <Icon
            icon={
              isDefault
                ? 'material-symbols:check-circle-rounded'
                : 'material-symbols:check-circle-outline-rounded'
            }
            className={`text-[36px] transition-all ${isDefault ? 'text-[#20110A]' : 'text-[#20110A]/20'}`}
          />
        </div>
      </div>

      <div className="w-full flex gap-4 pb-10 pt-4">
        <button
          onClick={onPrev}
          className="flex-1 h-[56px] bg-[#20110A] text-white rounded-full text-b-16b active:scale-95 transition-all shadow-md"
        >
          이전 단계
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="flex-1 h-[56px] bg-[#20110A] text-white rounded-full text-b-16b active:scale-95 shadow-md"
        >
          완료
        </button>
      </div>

      <CommonModal
        isOpen={showModal}
        onClose={handleGoHome}
        title="농장 추가 완료!"
        description={`${nickname}님의 새로운 농장이\n성공적으로 추가되었습니다.`}
      />
    </div>
  );
};

export default Step3;
