import { useMemo, useState, useEffect, type ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import {
  createConditionBasedSchedule,
  createTimeBasedSchedule,
  deleteSchedule,
  toggleScheduleEnabled,
} from '@/apis/scheduleService';
import ConfirmPng from '@/assets/image/schedule/confirm.png';
import SchedulePng from '@/assets/image/schedule/schedule.png';
import ToggleButtonPng from '@/assets/image/schedule/button.png';
import Footer from '@/component/constants/Footer';
import BottomSheetHeader from '@/component/farm/farmDetail/BottomSheetHeader';
import { useSchedules } from '@/hooks/useSchedules';
import { useFarmWeather } from '@/hooks/useFarmWeather';
import {
  formatExecutedAt,
  toApiControlSystem,
  toApiDays,
  toApiOperator,
  toApiSensor,
  toLocalTime,
} from '@/utils/scheduleMapper';

const SENSORS = [
  { id: 'temperature', label: '온도', unit: "'c" },
  { id: 'soilMoisture', label: '토양 수분', unit: '%' },
  { id: 'humidity', label: '습도', unit: '%' },
  { id: 'illuminance', label: '조도', unit: 'LUX' },
  { id: 'co2', label: 'co2', unit: 'ppm' },
];

const DAYS_OF_WEEK = ['월', '화', '수', '목', '금', '토', '일'];

const ICONS = {
  irrigation: <path d="M7 0C7 0 0 7.83333 0 11.5C0 15.0899 3.13401 16 7 16C10.866 16 14 15.0899 14 11.5C14 7.83333 7 0 7 0Z" />,
  lighting: <path d="M7 0C3.68629 0 1 2.68629 1 6C1 8.23787 2.23595 10.1915 4 11.2336V13C4 13.5523 4.44772 14 5 14H9C9.55228 14 10 13.5523 10 13V11.2336C11.764 10.1915 13 8.23787 13 6C13 2.68629 10.3137 0 7 0ZM5 15C5 15.5523 5.44772 16 6 16H8C8.55228 16 9 15.5523 9 15V14.5H5V15Z" />,
  ventilation: <path d="M8 8C8 8.55228 7.55228 9 7 9C6.44772 9 6 8.55228 6 8C6 7.44772 6.44772 7 7 7C7.55228 7 8 7.44772 8 8ZM8 8L11.5 4.5C12.5 3.5 13.5 4 14 5C14.5 6 13.5 7.5 12 8L8 8ZM8 8L4.5 11.5C3.5 12.5 4 13.5 5 14C6 14.5 7.5 13.5 8 12L8 8ZM8 8L11.5 11.5C12.5 12.5 14 11.5 14 10C14 8.5 12.5 7.5 11 8L8 8ZM8 8L4.5 4.5C3.5 3.5 2.5 4 2 5C1.5 6 2.5 7.5 4 8L8 8Z" />,
  heating: <path d="M5 0C3.34315 0 2 1.34315 2 3V9.17071C0.766307 10.0658 0 11.4554 0 13C0 15.7614 2.23858 18 5 18C7.76142 18 10 15.7614 10 13C10 11.4554 9.23369 10.0658 8 9.17071V3C8 1.34315 6.65685 0 5 0ZM5 2C5.55228 2 6 2.44772 6 3V9H4V3C4 2.44772 4.44772 2 5 2ZM5 16C3.34315 16 2 14.6569 2 13C2 11.8344 2.66632 10.8258 3.65685 10.3431V9H6.34315V10.3431C7.33368 10.8258 8 11.8344 8 13C8 14.6569 6.65685 16 5 16Z" />,
  delete: (
    <>
      <path d="M3 6H5H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  )
};

const SectionDivider = ({ title, extra }: { title: string; extra?: ReactNode }) => (
  <div className="flex items-center mb-4 gap-4 mt-2 shrink-0">
    <span className="text-[18px] font-bold text-black whitespace-nowrap">{title}</span>
    <div className="h-[2px] bg-gray-300 flex-1"></div>
    {extra}
  </div>
);

const getWeatherEmoji = (...sources: (string | undefined)[]): string => {
  const text = sources.filter(Boolean).join(' ').toLowerCase();

  if (/(천둥|뇌우|thunder|storm|⛈)/.test(text)) return '⛈️';
  if (/(진눈깨비|sleet)/.test(text)) return '🌨️';
  if (/(눈|snow|flurr|blizzard)/.test(text)) return '❄️';
  if (/(비|소나기|장대비|이슬비|rain|shower|drizzle)/.test(text)) return '🌧️';
  if (/(안개|연무|박무|fog|mist|haze)/.test(text)) return '🌫️';
  if (/(구름조금|구름 조금|대체로\s*맑|partly|few clouds|mostly clear)/.test(text)) return '🌤️';
  if (/(흐림|흐려|구름많음|구름 많음|구름|cloud|overcast)/.test(text)) return '☁️';
  if (/(맑음|맑|clear|sunny|sun|fair)/.test(text)) return '☀️';

  return '🌡️';
};

const HIDDEN_SCHEDULE_IDS_KEY = 'hiddenScheduleIds';

const loadHiddenScheduleIds = (): Set<number> => {
  try {
    const raw = localStorage.getItem(HIDDEN_SCHEDULE_IDS_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? (arr as number[]) : []);
  } catch {
    return new Set();
  }
};

const saveHiddenScheduleIds = (ids: Set<number>) => {
  try {
    localStorage.setItem(HIDDEN_SCHEDULE_IDS_KEY, JSON.stringify([...ids]));
  } catch {
    /* localStorage 사용 불가 시 무시 */
  }
};

const SchedulePage = () => {
  const { farmId: farmIdParam } = useParams<{ farmId: string }>();
  const farmId = useMemo(() => {
    const n = Number(farmIdParam);
    return Number.isFinite(n) ? n : null;
  }, [farmIdParam]);

  const { schedules, histories, loading, refetch } = useSchedules(farmId);
  const { weather, loading: weatherLoading } = useFarmWeather(farmId);
  const [currentTime, setCurrentTime] = useState(new Date());

  const weatherDisplayList = useMemo(() => {
    if (!weather?.hourlyForecast) return [];
    return weather.hourlyForecast.map((item) => ({
      time: item.displayTime,
      temp: Math.round(item.temperature),
      emoji: getWeatherEmoji(item.weather, item.weatherText),
      text: item.weatherText,
    }));
  }, [weather]);

  const [step, setStep] = useState(1);

  useEffect(() => {
    if (step !== 5) return;
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, [step]);
  const [activeTab, setActiveTab] = useState<'list' | 'history' | null>('list');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [scheduleName, setScheduleName] = useState('');
  const [selectedSystem, setSelectedSystem] = useState('irrigation');
  const [operationMode, setOperationMode] = useState<'time' | 'condition'>('time');
  const [executionHour, setExecutionHour] = useState('17');
  const [executionMinute, setExecutionMinute] = useState('30');
  const [selectedDays, setSelectedDays] = useState<string[]>(['월']);
  const [operationDuration, setOperationDuration] = useState(20);
  const [selectedSensor, setSelectedSensor] = useState('temperature');
  const [conditionOperator, setConditionOperator] = useState('greater');
  const [conditionValue, setConditionValue] = useState('');
  const [autoStopWhenRecovered] = useState(true);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [swipedItemId, setSwipedItemId] = useState<number | null>(null);

  // 삭제 실패(서버 오류) 시에도 화면에서 강제로 가릴 스케줄 id 목록
  const [hiddenIds, setHiddenIds] = useState<Set<number>>(() =>
    loadHiddenScheduleIds(),
  );

  // 실제 렌더링에 사용할 목록 (숨김 처리된 항목 제외)
  const visibleSchedules = useMemo(
    () => schedules.filter((s) => !hiddenIds.has(s.scheduleId)),
    [schedules, hiddenIds],
  );

  const resetForm = () => {
    setScheduleName('');
    setSelectedSystem('irrigation');
    setOperationMode('time');
    setExecutionHour('17');
    setExecutionMinute('30');
    setSelectedDays(['월']);
    setOperationDuration(20);
    setSelectedSensor('temperature');
    setConditionOperator('greater');
    setConditionValue('');
  };

  const handleDragStart = (clientX: number) => setTouchStartX(clientX);
  const handleDragEnd = (clientX: number, id: number) => {
    if (touchStartX === null) return;
    const diff = touchStartX - clientX;
    if (diff > 50) setSwipedItemId(id);
    else if (diff < -30 && swipedItemId === id) setSwipedItemId(null);
    setTouchStartX(null);
  };

  const handleDelete = async (id: number) => {
    // 1) 서버에 실제 삭제 요청 (성공하면 진짜 삭제됨)
    try {
      await deleteSchedule(id);
    } catch (err) {
      // 2) 서버 오류(예: 500) 등으로 실패해도 화면에서는 강제로 숨김
      console.error('스케줄 삭제 실패 → 화면에서 강제 숨김 처리:', err);
    } finally {
      setHiddenIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        saveHiddenScheduleIds(next);
        return next;
      });
      setSwipedItemId(null);
      await refetch();
    }
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const toggleScheduleActive = async (
    id: number,
    currentEnabled: boolean
  ) => {
    try {
      await toggleScheduleEnabled(id, !currentEnabled);
      await refetch();
    } catch (err) {
      console.error('스케줄 활성화 변경 실패:', err);
      alert('상태 변경에 실패했습니다.');
    }
  };

  const handleSubmitSchedule = async () => {
    if (farmId === null) {
      alert('농장 정보를 확인할 수 없습니다.');
      return;
    }
    if (!scheduleName.trim()) {
      alert('스케줄 이름을 입력해주세요.');
      return;
    }
    if (operationMode === 'condition' && !conditionValue.trim()) {
      alert('실행 조건 값을 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);

      if (operationMode === 'time') {
        const body = {
          farmId,
          name: scheduleName,
          controlSystemType: toApiControlSystem(selectedSystem),
          executeTime: toLocalTime(executionHour, executionMinute),
          daysOfWeek: toApiDays(selectedDays),
          durationMinutes: operationDuration,
        };
        console.log('🔵 [시간 기반] 요청 body:', JSON.stringify(body, null, 2));
        await createTimeBasedSchedule(body);
      } else {
        const body = {
          farmId,
          name: scheduleName,
          controlSystemType: toApiControlSystem(selectedSystem),
          sensorType: toApiSensor(selectedSensor),
          operator: toApiOperator(conditionOperator),
          thresholdValue: Number(conditionValue),
          autoStopWhenRecovered,
        };
        console.log('🟢 [조건 기반] 요청 body:', JSON.stringify(body, null, 2));
        await createConditionBasedSchedule(body);
      }

      await refetch();
      setIsModalOpen(true);
    } catch (err: unknown) {
      const e = err as any;
      console.error('🔴 등록 실패 - 상태코드:', e?.response?.status);
      console.error('🔴 백엔드 응답 데이터:', e?.response?.data);
      console.error('🔴 요청 URL:', e?.config?.url);
      console.error('🔴 요청 body (axios가 직렬화한 최종):', e?.config?.data);
      alert(
        `스케줄 등록에 실패했습니다.\n${e?.response?.data?.message || e?.message || '알 수 없는 오류'}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const historyStats = useMemo(() => {
    const total = histories.length;
    const success = histories.filter((h) => h.status === 'SUCCESS').length;
    const cancel = histories.filter((h) => h.status === 'CANCELED').length;
    const fail = histories.filter((h) => h.status === 'FAIL').length;
    return { total, success, cancel, fail };
  }, [histories]);

  return (
    <div className="flex-1 flex flex-col items-center bg-[#E6E0D3]/50 rounded-t-[30px] pt-6 px-6 pb-6 w-full h-[100dvh] overflow-y-auto relative">
      {step === 1 && (
        <>
          <BottomSheetHeader title="스케줄러" description="" />
          <div className="w-full bg-white rounded-[32px] mt-4 px-6 py-8 flex flex-col shadow-sm min-h-[420px]">
            <div className="flex flex-col items-center justify-between h-full flex-1">
              <p className="text-black font-bold text-[18px] text-center tracking-tight mt-2">작물에 맞는 스케줄을 설정 하시겠습니까?</p>
              <img src={SchedulePng} alt="illustration" className="w-[180px] object-contain my-auto" />
              <div className="flex gap-4 justify-center w-full px-2 mb-2">
                <button className="bg-[#2A160C] text-white rounded-full flex-1 max-w-[150px] py-3.5 text-[18px] font-bold" onClick={() => setStep(5)}>아니요</button>
                <button className="bg-[#2A160C] text-white rounded-full flex-1 max-w-[150px] py-3.5 text-[18px] font-bold" onClick={() => setStep(2)}>네</button>
              </div>
            </div>
          </div>
          <div className="mt-auto w-full pt-6"><Footer /></div>
        </>
      )}

      {step === 2 && (
        <div className="w-full h-full flex flex-col pb-2">
          <BottomSheetHeader title="스케줄 추가" description="" />
          <p className="text-[14px] text-black/80 text-center mb-6 tracking-tight mt-2">자신에게 맞는 자동화 시스템을 설정하세요.</p>

          <SectionDivider title="스케줄 이름" />
          <input
            type="text"
            placeholder="스케줄의 이름을 입력해주세요."
            value={scheduleName}
            onChange={(e) => setScheduleName(e.target.value)}
            className="w-full bg-white rounded-[20px] px-6 py-4 text-[15px] text-black outline-none mb-6 placeholder-gray-400 shadow-sm"
          />

          <SectionDivider title="제어 시스템" />
          <div className="flex flex-col gap-5 pl-2 mb-6">
            {[
              { id: 'irrigation', label: '관개 시스템', desc: '자동 물공급', icon: ICONS.irrigation, viewBox: "0 0 14 16" },
              { id: 'lighting', label: '조명 시스템', desc: '자동 조명 ON/OFF', icon: ICONS.lighting, viewBox: "0 0 14 16" },
              { id: 'ventilation', label: '환기 시스템', desc: '자동 팬 작동 환기,습도', icon: ICONS.ventilation, viewBox: "0 0 16 16" },
              { id: 'heating', label: '난방 시스템', desc: '자동 온도 조절', icon: ICONS.heating, viewBox: "0 0 10 16", ml: 'ml-1' },
            ].map((sys) => (
              <label key={sys.id} className="flex items-center cursor-pointer" onClick={() => setSelectedSystem(sys.id)}>
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${selectedSystem === sys.id ? 'border-[#2A160C] bg-[#2A160C]' : 'border-white bg-white'}`} />
                <svg className={`w-[14px] h-[16px] text-[#2A160C] mr-2 ${sys.ml || ''}`} viewBox={sys.viewBox} fill="currentColor">{sys.icon}</svg>
                <span className="font-bold text-[16px] text-black w-[90px]">{sys.label}</span>
                <span className="text-[14px] text-black/90">{sys.desc}</span>
              </label>
            ))}
          </div>

          <div className="mt-auto flex gap-4 justify-center w-full px-2">
            <button className="bg-[#2A160C] text-white rounded-[20px] flex-1 max-w-[150px] py-4 text-[16px] font-bold" onClick={() => setStep(1)}>이전</button>
            <button className="bg-[#2A160C] text-white rounded-[20px] flex-1 max-w-[150px] py-4 text-[16px] font-bold" onClick={() => setStep(3)}>다음</button>
          </div>
        </div>
      )}

      {(step === 3 || step === 4) && (
        <div className="w-full h-full flex flex-col pb-2">
          <BottomSheetHeader title="스케줄 추가" description="" />
          <p className="text-[14px] text-black/80 text-center mb-6 tracking-tight mt-2">자신에게 맞는 자동화 시스템을 설정하세요.</p>

          <SectionDivider title="어떻게 작동 할까요?" />
          <div className="flex flex-col gap-6 pl-2 mb-6 shrink-0">
            {(['time', 'condition'] as const).map((mode) => (
              <label key={mode} className="flex items-center cursor-pointer" onClick={() => setOperationMode(mode)}>
                <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${operationMode === mode ? 'border-[#2A160C] bg-[#2A160C]' : 'border-white bg-white'}`} />
                <svg className="w-[20px] h-[20px] mr-3" viewBox="0 0 20 20" fill="none">
                  <rect width="20" height="20" rx="4" fill="#2A160C" />
                  {mode === 'time' ? (
                    <><circle cx="10" cy="10" r="4.5" stroke="white" strokeWidth="1.5" /><path d="M10 7.5V10L11.5 11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>
                  ) : (
                    <><circle cx="7" cy="7" r="1.5" fill="white" /><circle cx="13" cy="7" r="1.5" fill="white" /><circle cx="7" cy="13" r="1.5" fill="white" /><circle cx="13" cy="13" r="1.5" fill="white" /></>
                  )}
                </svg>
                <span className="font-bold text-[16px] text-black w-[80px]">{mode === 'time' ? '시간 기반' : '조건 기반'}</span>
                <span className="text-[14px] text-black/90 tracking-tight">{mode === 'time' ? '특정 시간에 자동으로 실행' : '특정 조건에 자동으로 실행'}</span>
              </label>
            ))}
          </div>

          {step === 4 && (
            <div className="flex-1 overflow-y-auto">
              {operationMode === 'time' ? (
                <>
                  <SectionDivider title="실행 시간" extra={
                    <div className="flex items-center gap-2">
                      <input type="text" className="w-[60px] h-[45px] bg-white rounded-[12px] text-center font-bold text-[18px] outline-none shadow-sm" value={executionHour} onChange={(e) => setExecutionHour(e.target.value)} />
                      <span className="font-bold text-[20px] text-black">:</span>
                      <input type="text" className="w-[60px] h-[45px] bg-white rounded-[12px] text-center font-bold text-[18px] outline-none shadow-sm" value={executionMinute} onChange={(e) => setExecutionMinute(e.target.value)} />
                    </div>
                  } />
                  <div className="flex flex-col mb-5 shrink-0">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-[17px] font-bold text-black whitespace-nowrap">실행 요일</span>
                      <div className="h-[2px] bg-gray-300 flex-1"></div>
                      <span className="text-[12px] text-gray-500 font-medium">미선택시 매일</span>
                    </div>
                    <div className="flex justify-between w-full">
                      {DAYS_OF_WEEK.map(day => (
                        <button key={day} onClick={() => toggleDay(day)} className={`w-[40px] h-[40px] rounded-[12px] font-bold text-[15px] shadow-sm transition-colors ${selectedDays.includes(day) ? 'bg-[#2A160C] text-white' : 'bg-white text-black'}`}>{day}</button>
                      ))}
                    </div>
                  </div>
                  <SectionDivider title="작동 시간" extra={
                    <div className="flex items-center justify-between w-[130px] h-[45px] bg-white rounded-[12px] px-3 shadow-sm">
                      <button onClick={() => setOperationDuration(p => Math.max(0, p - 1))} className="text-[24px] font-bold text-gray-400 pb-1">-</button>
                      <span className="font-bold text-[16px] text-black">{operationDuration}분</span>
                      <button onClick={() => setOperationDuration(p => p + 1)} className="text-[22px] font-bold text-[#2A160C] pb-0.5">+</button>
                    </div>
                  } />
                </>
              ) : (
                <>
                  <SectionDivider title="센서 선택" />
                  <div className="grid grid-cols-2 gap-y-5 gap-x-2 pl-2 mb-8">
                    {SENSORS.map(s => (
                      <label key={s.id} className="flex items-center cursor-pointer" onClick={() => setSelectedSensor(s.id)}>
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${selectedSensor === s.id ? 'border-[#2A160C] bg-[#2A160C]' : 'border-white bg-white'}`} />
                        <span className="font-bold text-[15px] text-black shrink-0">{s.label}</span>
                        <span className="text-[13px] text-black/60 ml-2 font-medium">단위: {s.unit}</span>
                      </label>
                    ))}
                  </div>
                  <SectionDivider title="실행 조건" />
                  <div className="grid grid-cols-2 gap-3 w-full mb-3 px-1 h-[48px]">
                    <div className="relative h-full">
                      <select className="w-full h-full bg-white rounded-[16px] px-4 font-bold text-[15px] shadow-sm outline-none appearance-none text-center cursor-pointer" value={conditionOperator} onChange={(e) => setConditionOperator(e.target.value)}>
                        <option value="greater">보다 큰</option><option value="less">보다 작은</option><option value="equal">같은</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M6 0L12 10H0L6 0Z" fill="#2A160C" /></svg>
                      </div>
                    </div>
                    <input type="text" placeholder="실행 조건 값" className="w-full h-full bg-white rounded-[16px] px-4 text-center font-bold text-[15px] shadow-sm outline-none" value={conditionValue} onChange={(e) => setConditionValue(e.target.value)} />
                  </div>
                  <p className="text-[13px] text-[#803131] font-medium text-center mt-2">최적 조건 만족시 자동으로 멈춥니다.</p>
                </>
              )}
            </div>
          )}

          <div className="mt-auto flex gap-4 justify-center w-full px-2 pt-4">
            <button className="bg-[#2A160C] text-white rounded-[20px] flex-1 max-w-[150px] py-4 text-[16px] font-bold" onClick={() => setStep(step - 1)} disabled={isSubmitting}>이전</button>
            <button
              className="bg-[#2A160C] text-white rounded-[20px] flex-1 max-w-[150px] py-4 text-[16px] font-bold disabled:opacity-50"
              disabled={isSubmitting}
              onClick={() => {
                if (step === 3) setStep(4);
                else handleSubmitSchedule();
              }}>
              {isSubmitting ? '등록 중...' : '완료'}
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="w-full h-full flex flex-col">
          <BottomSheetHeader title="스케줄러" description="" />
          <div className="bg-white rounded-[24px] px-5 py-6 mb-4 shadow-sm mt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[16px] font-bold">☀ 오늘의 날씨 ☀</span>
              <span className="text-[12px] text-black/50">
                {currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true })} 기준
              </span>
            </div>
            <div className="mb-6">
              <p className="text-[13px] font-bold text-black/80">{weather?.regionName || '농장 주변'} 실시간 날씨입니다.</p>
              <p className="text-[13px] text-black/70">스케줄 설정 시 참고해주세요.</p>
            </div>
            <div className="flex justify-between items-center w-full overflow-x-auto gap-3 scrollbar-hide">
              {weatherLoading ? (
                <div className="w-full text-center text-[13px] text-gray-500 py-4">날씨 정보를 불러오는 중...</div>
              ) : weatherDisplayList.length > 0 ? (
                weatherDisplayList.map((w, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 min-w-[50px]">
                    <span className="text-[12px] font-medium text-black whitespace-nowrap">{w.time}</span>
                    <span className="text-[26px] leading-none" role="img" aria-label={w.text}>{w.emoji}</span>
                    <span className="text-[13px] font-bold">{w.temp}°</span>
                  </div>
                ))
              ) : (
                <div className="w-full text-center text-[13px] text-gray-500 py-4">날씨 데이터가 없습니다.</div>
              )}
            </div>
          </div>

          <div className="flex gap-4 w-full mb-6">
            <button onClick={() => setActiveTab('list')} className={`flex-1 py-3 rounded-full text-[15px] font-bold shadow-sm ${activeTab === 'list' ? 'bg-[#2A160C] text-white' : 'bg-white text-black'}`}>스케줄 목록</button>
            <button onClick={() => setActiveTab('history')} className={`flex-1 py-3 rounded-full text-[15px] font-bold shadow-sm ${activeTab === 'history' ? 'bg-[#2A160C] text-white' : 'bg-white text-black'}`}>스케줄 실행 이력</button>
          </div>

          {activeTab === 'list' ? (
            <div className="flex flex-col flex-1 pb-10">
              <div className="flex flex-col items-center mb-6">
                <span className="text-[18px] font-bold text-[#2A1E17] mb-1">자동화 스케줄</span>
                <span className="text-[13px] text-[#8C8279]">조건, 시간 기반 스케줄을 확인하세요!</span>
              </div>
              <div className="flex justify-end mb-4">
                <button className="text-[14px] text-[#594E46] font-bold" onClick={() => { resetForm(); setStep(2); setActiveTab(null); }}>스케줄 추가 +</button>
              </div>
              <div className="flex flex-col gap-4 overflow-x-hidden">
                {loading && visibleSchedules.length === 0 && (
                  <p className="text-center text-[13px] text-[#8C8279] py-6">로딩 중...</p>
                )}
                {!loading && visibleSchedules.length === 0 && (
                  <p className="text-center text-[13px] text-[#8C8279] py-6">등록된 스케줄이 없습니다.</p>
                )}
                {visibleSchedules.map((item) => (
                  <div key={item.scheduleId} className="relative w-full rounded-[20px]"
                    onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                    onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX, item.scheduleId)}
                    onMouseDown={(e) => handleDragStart(e.clientX)}
                    onMouseUp={(e) => handleDragEnd(e.clientX, item.scheduleId)}>
                    <div className="absolute inset-0 bg-[#8C3A3A] rounded-[20px] flex justify-end z-0">
                      <div className="w-[85px] h-full flex justify-center items-center">
                        <button onClick={() => handleDelete(item.scheduleId)} className="w-[40px] h-[40px] active:scale-95 transition-transform">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">{ICONS.delete}</svg>
                        </button>
                      </div>
                    </div>
                    <div className={`bg-[#EAE6DF] rounded-[20px] p-5 w-full relative z-10 transition-transform duration-300 ${swipedItemId === item.scheduleId ? '-translate-x-[85px]' : 'translate-x-0'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[15px] font-bold text-[#2A1E17]">☀ {item.name}</span>
                          <span className="text-[13px] text-[#8C8279]">| {item.scheduleType === 'TIME_BASED' ? '시간 기반' : '조건 기반'}</span>
                        </div>
                        <div onClick={() => toggleScheduleActive(item.scheduleId, item.enabled)} className={`w-[60px] h-[32px] flex items-center rounded-full p-1 cursor-pointer transition-colors shadow-sm ${item.enabled ? 'bg-black' : 'bg-white'}`}>
                          <div className={`transition-transform duration-300 ${item.enabled ? 'translate-x-[26px]' : 'translate-x-0'}`}>
                            <img src={ToggleButtonPng} alt="toggle" className="w-[38px] h-[38px] max-w-none" />
                          </div>
                        </div>
                      </div>
                      <p className="text-[14px] font-bold text-[#594E46] mb-1">조건 : {item.scheduleTypeDescription || '-'}</p>
                      <p className="text-[14px] font-bold text-[#594E46] mb-3">동작 : {item.controlSystemDescription || item.summary || '-'}</p>
                      <p className="text-[12px] text-[#8C8279]">마지막 작동 : {formatExecutedAt(item.lastExecutedAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-1 pb-10">
              <div className="flex flex-col items-center mb-6">
                <span className="text-[18px] font-bold text-black mb-1">스케줄 실행 이력</span>
                <span className="text-[13px] text-black/70">내가 성공한 스케줄들을 확인하세요!</span>
              </div>
              <div className="bg-[#EAE4D9] rounded-[20px] p-4 flex justify-between w-full mb-6">
                {[
                  { l: '총 실행', v: historyStats.total },
                  { l: '실행 성공', v: historyStats.success },
                  { l: '자동 취소', v: historyStats.cancel },
                  { l: '오류', v: historyStats.fail },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center bg-white rounded-xl py-3 px-2 flex-1 mx-1 shadow-sm">
                    <span className="text-[12px] text-black/70 font-bold mb-2">{s.l}</span>
                    <span className="text-[18px] font-extrabold">{s.v}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {loading && histories.length === 0 && (
                  <p className="text-center text-[13px] text-[#8C8279] py-6">로딩 중...</p>
                )}
                {!loading && histories.length === 0 && (
                  <p className="text-center text-[13px] text-[#8C8279] py-6">실행 이력이 없습니다.</p>
                )}
                {histories.map((item) => {
                  const isSuccess = item.status === 'SUCCESS';
                  return (
                    <div key={item.historyId} className={`border-2 border-dashed rounded-[20px] p-4 flex items-center gap-4 bg-white ${isSuccess ? 'border-gray-300' : 'border-blue-400'}`}>
                      <div className={`w-[60px] h-[60px] rounded-full border-2 flex flex-col justify-center items-center ${isSuccess ? 'bg-[#5C7D4A] border-[#3B542E]' : 'bg-[#F2C94C] border-[#B89626]'}`}>
                        <div className="flex gap-2"><div className="w-2 h-2 bg-black rounded-full" /><div className="w-2 h-2 bg-black rounded-full" /></div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-black mb-1">{formatExecutedAt(item.executedAt)}</span>
                        <span className="text-[15px] font-bold text-black mb-1">{item.scheduleName}</span>
                        <span className="text-[13px] text-black/80">
                          {isSuccess
                            ? `${item.statusDescription || '실행 성공'} (${item.durationMinutes}분)`
                            : `사유 : ${item.message || item.statusDescription || '실행 실패'}`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-8">
          <div className="bg-white rounded-[30px] w-full max-w-[340px] pt-10 pb-8 px-6 flex flex-col items-center shadow-xl">
            <img src={ConfirmPng} alt="success" className="w-[180px] h-auto mb-6 object-contain" />
            <div className="text-[#2A160C] text-[18px] font-extrabold mb-8 text-center">스케줄이 성공적으로 설정 되었습니다!</div>
            <button
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
                setStep(5);
                setActiveTab('list');
              }}
              className="bg-[#2A160C] text-white w-[130px] py-3 rounded-full text-[16px] font-bold">확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;
