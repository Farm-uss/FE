import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import axiosInstance from '@/apis/axios';
import Footer from '@/component/constants/Footer';
import LazyImage from '@/component/constants/LazyImage';
import BottomSheetHeader from '@/component/farm/farmDetail/BottomSheetHeader';

interface FarmDetailContext {
  farmInfo: {
    farmId: number;
    cropsId: number;
  };
}

interface GrowthDiaryDetail {
  farmName: string;
  date: string;
  imageUrl: string;
  temperature: { min: number; max: number; avg: number };
  growth: { sizeCm: number; leafCount: number; fruitCount: number };
  gdd: { daily: number; cumulative: number };
  disease: {
    status: string; // 'NORMAL' | 'ABNORMAL'
    name: string;
    confidence: number; // 0.0 ~ 1.0
  };
}

const EMPTY_DATA: GrowthDiaryDetail = {
  farmName: '',
  date: '',
  imageUrl: '',
  temperature: { min: 0, max: 0, avg: 0 },
  growth: { sizeCm: 0, leafCount: 0, fruitCount: 0 },
  gdd: { daily: 0, cumulative: 0 },
  disease: { status: 'NORMAL', name: '', confidence: 0 },
};

const formatDateForAPI = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDateForUI = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const GrowthDiary = () => {
  const { farmInfo } = useOutletContext<FarmDetailContext>();
  const farmId = farmInfo?.farmId;
  const cropsId = farmInfo?.cropsId;

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [diaryData, setDiaryData] = useState<GrowthDiaryDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  useEffect(() => {
    const fetchDiaryData = async () => {
      console.log('🟡 [GrowthDiary] farmId:', farmId, 'cropsId:', cropsId);

      if (!farmId || !cropsId) {
        console.warn('🟡 [GrowthDiary] farmId/cropsId 없음 → 빈 데이터 표시');
        setDiaryData(EMPTY_DATA);
        return;
      }

      setIsLoading(true);
      const dateStr = formatDateForAPI(currentDate);
      const url = `/api/v1/farms/${farmId}/crops/${cropsId}/growth-diary/${dateStr}`;
      console.log('🔵 [GrowthDiary] 요청 URL:', url);

      try {
        const response = await axiosInstance.get<GrowthDiaryDetail>(url);
        console.log('🟢 [GrowthDiary] 응답:', response.data);
        setDiaryData(response.data);
      } catch (err: unknown) {
        const e = err as any;
        console.warn(
          '🟠 [GrowthDiary] 데이터 없음 - status:',
          e?.response?.status,
          'data:',
          e?.response?.data,
        );
        setDiaryData(EMPTY_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiaryData();
  }, [currentDate, farmId, cropsId]);

  return (
    <div className="flex-1 flex flex-col items-center bg-[#E6E0D3]/50 rounded-t-[30px] py-6 px-6 w-full h-full overflow-y-auto">
      <BottomSheetHeader
        title={
          diaryData?.farmName
            ? `${diaryData.farmName} 성장일기`
            : '성장일기'
        }
        description="하루하루, 내 농장을 체크하세요!"
      />

      <div className="w-full -mt-8">
        <div className="w-full flex justify-end text-[12px] font-medium text-[#2A160C] pb-1 border-b border-[#2A160C]/30">
          GDD
        </div>

        <div className="w-full flex items-center justify-between py-4">
          <button onClick={handlePrevDay}>
            <Icon
              icon="ph:caret-left-fill"
              className="text-[20px] text-[#2A160C]"
            />
          </button>
          <span className="text-[18px] font-bold text-[#2A160C]">
            {currentDate.getMonth() + 1}월
          </span>
          <button onClick={handleNextDay}>
            <Icon
              icon="ph:caret-right-fill"
              className="text-[20px] text-[#2A160C]"
            />
          </button>
        </div>

        <div className="w-full bg-white rounded-[24px] mt-2 px-5 py-6 flex flex-col items-center min-h-[400px] shadow-sm">
          <div className="text-[18px] font-bold text-[#2A160C] mb-5">
            {formatDateForUI(currentDate)}
          </div>

          {isLoading ? (
            <div className="w-full h-[300px] flex items-center justify-center text-[#8B8880]">
              로딩 중...
            </div>
          ) : (
            <>
              {(() => {
                const data = diaryData || EMPTY_DATA;
                const hasDisease =
                  data.disease && data.disease.status !== 'NORMAL';

                return (
                  <>
                    <div className="w-full h-[220px] bg-[#D9D3C3] rounded-[20px] overflow-hidden flex items-center justify-center">
                      {data.imageUrl ? (
                        <LazyImage
                          src={data.imageUrl}
                          alt="diary"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon
                          icon="mdi:image-outline"
                          className="text-[90px] text-[#8B8880]"
                        />
                      )}
                    </div>

                    <div className="w-full grid grid-cols-2 gap-3 mt-4">
                      <div className="flex flex-col gap-3">
                        <div className="bg-[#E6E0D3] rounded-[20px] p-4 flex-1 flex flex-col justify-center items-center text-[#2A160C]">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-[16px]">온도</span>
                            <span className="text-[15px]">
                              평균:{data.temperature?.avg ?? 0}도
                            </span>
                          </div>
                          <div className="text-[13px] text-[#2A160C]/70">
                            최저{data.temperature?.min ?? 0} / 최고
                            {data.temperature?.max ?? 0}
                          </div>
                        </div>

                        <div className="bg-[#E6E0D3] rounded-[20px] p-4 flex-1 flex flex-col justify-center items-center text-[#2A160C]">
                          {hasDisease ? (
                            <>
                              <div className="font-bold text-[15px] text-center">
                                "{data.disease.name}" 취약
                              </div>
                              <div className="text-[12px] text-[#2A160C]/70">
                                신뢰도{' '}
                                {Math.round(
                                  (data.disease.confidence ?? 0) * 100,
                                )}
                                %
                              </div>
                            </>
                          ) : (
                            <div className="text-[14px] font-medium text-[#2A160C]/60">
                              감지된 질병 없음
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-[#E6E0D3] rounded-[20px] px-5 py-5 text-[#2A160C] flex flex-col justify-center">
                        <div className="font-bold mb-3 text-[16px]">성장</div>
                        <div className="flex flex-col gap-2.5 text-[15px]">
                          <div>높이 : +{data.growth?.sizeCm ?? 0}cm</div>
                          <div>잎 : +{data.growth?.leafCount ?? 0}개</div>
                          <div>열매 : +{data.growth?.fruitCount ?? 0}개</div>
                          <div>GDD : +{data.gdd?.daily ?? 0}</div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </>
          )}
        </div>

        <div className="w-full text-center mt-10 mb-4 text-[#8B8880] text-[14px]" />
        <Footer />
      </div>
    </div >
  );
};

export default GrowthDiary;
