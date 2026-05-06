import { useState } from 'react';

import type { CropRecommendResponse } from '@/types/cropRecommend';

interface Step1Props {
  onNext: (useAi: boolean, result: CropRecommendResponse | null) => void;
}

const QUESTIONS = [
  {
    key: 'environment',
    question: '작물을 키울 장소는 어디인가요?',
    options: [
      '실내 창가/책상',
      '아파트 베란다',
      '옥상/마당/텃밭',
      '조명 시설이 갖춰진 스마트팜',
    ],
  },
  {
    key: 'careTime',
    question: '하루에 작물을 돌보는 시간은?',
    options: [
      '5분 이내 (최소 관리)',
      '15분 내외 (적정 관리)',
      '30분 이상 (집중 관리)',
      '주 1~2회 (비정기 관리)',
    ],
  },
  {
    key: 'goal',
    question: '재배를 통해 얻고 싶은 가치는?',
    options: [
      '실용적인 식재료',
      '심미적 힐링',
      '아이들 교육/성장 관찰',
      '최고의 가성비',
    ],
  },
  {
    key: 'harvestCycle',
    question: '선호하는 수확 주기는?',
    options: [
      '단기 재배 (4주 이내)',
      '중기 재배 (4~12주)',
      '장기 재배 (12주 이상)',
      '지속 수확 (상시 수확)',
    ],
  },
];

const DUMMY_RESULT: CropRecommendResponse = {
  recommendations: [
    { cropName: '상추', reason: '관리가 쉽고 빠른 수확이 가능해요.' },
    { cropName: '방울토마토', reason: '실내에서도 잘 자라고 수확량이 많아요.' },
    { cropName: '바질', reason: '향기롭고 요리에 활용도가 높아요.' },
  ],
  message: '현재 환경에 잘 맞는 작물을 찾았어요!',
};

const Step1 = ({ onNext }: Step1Props) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [location, setLocation] = useState('');

  const handleSelectOption = (currentIndex: number) => {
    if (currentIndex < 5) {
      setCurrentQ((prev) => prev + 1);
    } else {
      // Q5 완료 → 더미 데이터로 결과 전달 (추후 API로 교체)
      onNext(true, DUMMY_RESULT);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ((prev) => prev - 1);
  };

  // 시작 화면
  if (currentQ === 0) {
    return (
      <div className="w-full text-center space-y-10 animate-fadeIn px-4">
        <h2 className="text-h-20b text-[#20110A] leading-snug">
          현재 밭 상태에 맞는
          <br />
          작물 추천을 받겠습니까?
        </h2>
        <div className="flex gap-4 w-full">
          <button
            onClick={() => setCurrentQ(1)}
            className="w-full h-[56px] bg-[#20110A] text-white rounded-full text-b-16b shadow-lg active:scale-95 transition-all"
          >
            AI 추천 받을래요
          </button>
          <button
            onClick={() => onNext(false, null)}
            className="w-full h-[56px] bg-[#20110A] text-white rounded-full text-b-16b shadow-lg active:scale-95 transition-all"
          >
            아니요
          </button>
        </div>
      </div>
    );
  }

  // Q1: 지역 텍스트 입력
  if (currentQ === 1) {
    return (
      <div className="w-full space-y-8 animate-fadeIn px-4">
        <p className="text-c-12m text-[#20110A]/50 text-center">질문 1 / 5</p>
        <h2 className="text-h-20b text-[#20110A] text-center leading-snug">
          농장이 위치한 지역은 어디인가요?
        </h2>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="예: 서울시 성북구, 경기도 일산"
          className="w-full h-[52px] border border-[#20110A]/20 rounded-2xl px-4 text-b-16m text-[#20110A] bg-white outline-none focus:border-[#20110A]"
        />
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            className="flex-1 h-[52px] bg-white border border-[#20110A]/20 text-[#20110A] rounded-full text-b-16b active:scale-95 transition-all"
          >
            이전
          </button>
          <button
            onClick={() => location.trim() && setCurrentQ(2)}
            disabled={!location.trim()}
            className="flex-1 h-[52px] bg-[#20110A] text-white rounded-full text-b-16b shadow-lg active:scale-95 transition-all disabled:opacity-40"
          >
            다음
          </button>
        </div>
      </div>
    );
  }

  // Q2~Q5: 객관식
  const qIndex = currentQ - 2;
  const currentQuestion = QUESTIONS[qIndex];

  return (
    <div className="w-full space-y-6 animate-fadeIn px-4">
      <p className="text-c-12m text-[#20110A]/50 text-center">
        질문 {currentQ} / 5
      </p>
      <h2 className="text-h-20b text-[#20110A] text-center leading-snug">
        {currentQuestion.question}
      </h2>
      <div className="flex flex-col gap-3">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelectOption(currentQ)}
            className="w-full h-[56px] bg-white border border-[#20110A]/20 text-[#20110A] rounded-2xl text-b-16m active:scale-95 active:bg-[#20110A] active:text-white transition-all"
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="w-full h-[48px] text-[#20110A]/50 text-b-14m active:scale-95 transition-all"
      >
        ← 이전으로
      </button>
    </div>
  );
};

export default Step1;
