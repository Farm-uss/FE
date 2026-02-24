import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { addFarm } from '@/apis/farmService';
import CommonModal from '@/component/constants/CommonModal';
import LoadingSpinner from '@/component/constants/LoadingSpinner';

import basicFarmImg from '../../../../public/icons/farmBasicImg.svg';

interface Step3Props {
  onPrev: () => void;
  farmData: {
    name: string;
    address: string;
    area: number;
    cropName: string;
  };
}

const Step3 = ({ onPrev, farmData }: Step3Props) => {
  const navigate = useNavigate();
  const nickname = localStorage.getItem('nickname');
  const [showModal, setShowModal] = useState(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDefault, setIsDefault] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoHome = () => {
    setShowModal(false);
    navigate('/home');
  };

  const handleBoxClick = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
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
      setSelectedFile(file); // 파일 상태 저장
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
        setIsDefault(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDefault = () => {
    const nextDefault = !isDefault;
    setIsDefault(nextDefault);
    if (nextDefault) {
      setPreviewImg(null);
      setSelectedFile(null);
    }
  };

  // 서버로 최종 데이터 보내기
  const handleFinalSubmit = async () => {
    // 1. 로딩 시작!
    setIsLoading(true);

    try {
      await addFarm({
        ...farmData,
        image: isDefault ? null : selectedFile,
      });
      // 2. 성공하면 모달 띄우기
      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert('등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      // 3. 성공하든 실패하든 로딩은 끝내가
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center animate-fadeIn px-6 text-center">
      {/* 로딩 중일 때 전체 화면 로딩 스피너 처리 */}
      {isLoading && (
        <div className="fixed inset-0 z-300 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
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
        <div
          onClick={handleBoxClick}
          className={`w-full h-[260px] bg-[#E8E2D5] rounded-[50px] flex items-center justify-center shadow-inner overflow-hidden transition-all relative ${!isDefault ? 'cursor-pointer active:scale-95 border-2 border-dashed border-[#20110A]/20' : ''}`}
        >
          {isDefault ? (
            <img
              src={basicFarmImg}
              alt="기본"
              className="w-full h-full object-cover scale-110"
            />
          ) : previewImg ? (
            <img
              src={previewImg}
              alt="미리보기"
              className="w-full h-full object-cover animate-fadeIn"
            />
          ) : (
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
          onClick={handleFinalSubmit}
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
