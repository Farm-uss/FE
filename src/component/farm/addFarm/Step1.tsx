import { useState } from 'react';

import { getCropRecommendations } from '@/apis/cropRecommendService';
import type {
  CareTimeType,
  CropRecommendResponse,
  HarvestCycleType,
  PlaceType,
  PurposeType,
} from '@/types/cropRecommend';

import QuizChoiceStep from './quiz/QuizChoiceStep';
import QuizLoadingStep from './quiz/QuizLoadingStep';
import QuizLocationStep from './quiz/QuizLocationStep';

interface Step1Props {
  onNext: (useAi: boolean, result: CropRecommendResponse | null) => void;
}

const QUESTIONS = [
  {
    key: 'place',
    question: '작물을 키울 장소는 어디인가요?',
    options: [
      { label: '실내 창가/책상', value: 'INDOOR_WINDOW_DESK' },
      { label: '아파트 베란다', value: 'APARTMENT_BALCONY' },
      { label: '옥상/마당/텃밭', value: 'ROOFTOP_YARD_GARDEN' },
      { label: '조명 시설이 갖춰진 스마트팜', value: 'SMART_FARM_LIGHTING' },
    ],
  },
  {
    key: 'careTime',
    question: '하루에 작물을 돌보는 시간은?',
    options: [
      { label: '5분 이내 (최소 관리)', value: 'UNDER_FIVE_MINUTES' },
      { label: '15분 내외 (적정 관리)', value: 'AROUND_FIFTEEN_MINUTES' },
      { label: '30분 이상 (집중 관리)', value: 'OVER_THIRTY_MINUTES' },
      { label: '주 1~2회 (비정기 관리)', value: 'ONCE_OR_TWICE_A_WEEK' },
    ],
  },
  {
    key: 'purpose',
    question: '재배를 통해 얻고 싶은 가치는?',
    options: [
      { label: '실용적인 식재료', value: 'PRACTICAL_FOOD' },
      { label: '심미적 힐링', value: 'HEALING_AESTHETIC' },
      { label: '아이들 교육/성장 관찰', value: 'EDUCATION_OBSERVATION' },
      { label: '최고의 가성비', value: 'COST_EFFECTIVE' },
    ],
  },
  {
    key: 'harvestCycle',
    question: '선호하는 수확 주기는?',
    options: [
      { label: '단기 재배 (4주 이내)', value: 'SHORT_TERM' },
      { label: '중기 재배 (4~12주)', value: 'MID_TERM' },
      { label: '장기 재배 (12주 이상)', value: 'LONG_TERM' },
      { label: '지속 수확 (상시 수확)', value: 'CONTINUOUS' },
    ],
  },
];

const Step1 = ({ onNext }: Step1Props) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [location, setLocation] = useState('');
  const [answers, setAnswers] = useState<{
    place: PlaceType | '';
    careTime: CareTimeType | '';
    purpose: PurposeType | '';
    harvestCycle: HarvestCycleType | '';
  }>({
    place: '',
    careTime: '',
    purpose: '',
    harvestCycle: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectOption = async (key: string, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers as typeof answers);

    if (currentQ < 5) {
      setCurrentQ((prev) => prev + 1);
    } else {
      setLoading(true);
      setError(null);
      try {
        const result = await getCropRecommendations({
          location,
          place: newAnswers.place as PlaceType,
          careTime: newAnswers.careTime as CareTimeType,
          purpose: newAnswers.purpose as PurposeType,
          harvestCycle: newAnswers.harvestCycle as HarvestCycleType,
        });
        onNext(true, result);
      } catch {
        setError('추천을 불러오는 데 실패했어요. 다시 시도해주세요.');
        setLoading(false);
      }
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ((prev) => prev - 1);
  };

  if (loading) return <QuizLoadingStep />;

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

  // Q1: 지역 입력
  if (currentQ === 1) {
    return (
      <QuizLocationStep
        location={location}
        onChange={setLocation}
        onNext={() => setCurrentQ(2)}
        onPrev={handlePrev}
        error={error}
      />
    );
  }

  // Q2~Q5: 객관식
  const qIndex = currentQ - 2;
  const currentQuestion = QUESTIONS[qIndex];

  return (
    <QuizChoiceStep
      currentQ={currentQ}
      totalQ={5}
      question={currentQuestion.question}
      options={currentQuestion.options}
      onSelect={(value) => handleSelectOption(currentQuestion.key, value)}
      onPrev={handlePrev}
    />
  );
};

export default Step1;
