import React, { useState } from 'react';
import Footer from '@/component/constants/Footer';
import BottomSheetHeader from '@/component/farm/farmDetail/BottomSheetHeader';
import SchedulePng from '@/assets/image/schedule/schedule.png';
import ConfirmPng from '@/assets/image/schedule/confirm.png';
const SchedulePage = () => {
    const [step, setStep] = useState(1);

    const [selectedSystem, setSelectedSystem] = useState('irrigation');
    const [operationMode, setOperationMode] = useState('time');

    const [executionHour, setExecutionHour] = useState('17');
    const [executionMinute, setExecutionMinute] = useState('30');
    const [selectedDays, setSelectedDays] = useState<string[]>(['월']);
    const [operationDuration, setOperationDuration] = useState(20);

    const [selectedSensor, setSelectedSensor] = useState('temperature');
    const [conditionOperator, setConditionOperator] = useState('greater');
    const [conditionValue, setConditionValue] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleDay = (day: string) => {
        setSelectedDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

    const SENSORS = [
        { id: 'temperature', label: '온도', unit: "'c" },
        { id: 'soilMoisture', label: '토양 수분', unit: '%' },
        { id: 'humidity', label: '습도', unit: '%' },
        { id: 'illuminance', label: '조도', unit: 'LUX' },
        { id: 'co2', label: 'co2', unit: 'ppm' },
    ];

    return (
        <div className="flex-1 flex flex-col items-center bg-[#E6E0D3] rounded-t-[30px] pt-6 px-6 pb-6 w-full h-[100dvh] overflow-y-auto relative">

            {step === 1 && (
                <>
                    <BottomSheetHeader title={'스케줄러'} description="" />
                    <div className="w-full bg-white rounded-[32px] mt-4 px-6 py-8 flex flex-col shadow-sm min-h-[420px]">
                        <div className="flex flex-col items-center justify-between h-full flex-1">
                            <p className="text-black font-bold text-[18px] text-center tracking-tight mt-2">
                                작물에 맞는 스케줄을 설정 하시겠습니까?
                            </p>
                            <img src={SchedulePng} alt="schedule illustration" className="w-[180px] object-contain my-auto" />
                            <div className="flex gap-4 justify-center w-full px-2 mb-2">
                                <button className="bg-[#2A160C] text-white rounded-full flex-1 max-w-[150px] py-3.5 text-[18px] font-bold">아니요</button>
                                <button className="bg-[#2A160C] text-white rounded-full flex-1 max-w-[150px] py-3.5 text-[18px] font-bold" onClick={() => setStep(2)}>네</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto w-full pt-6">
                        <Footer />
                    </div>
                </>
            )}

            {step === 2 && (
                <div className="w-full h-full flex flex-col pb-2">
                    <BottomSheetHeader title={'스케줄 추가'} description="" />
                    <p className="text-[14px] text-black/80 text-center mb-6 tracking-tight mt-2">자신에게 맞는 자동화 시스템을 설정하세요.</p>

                    <div className="flex items-center mb-4 gap-4">
                        <span className="text-[18px] font-bold text-black whitespace-nowrap">스케줄 이름</span>
                        <div className="h-[2px] bg-gray-300 flex-1"></div>
                    </div>

                    <input type="text" placeholder="스케줄의 이름을 입력해주세요." className="w-full bg-white rounded-[20px] px-6 py-4 text-[15px] text-black outline-none mb-6 placeholder-gray-400 shadow-sm" />

                    <div className="flex items-center mb-6 gap-4">
                        <span className="text-[18px] font-bold text-black whitespace-nowrap">제어 시스템</span>
                        <div className="h-[2px] bg-gray-300 flex-1"></div>
                    </div>

                    <div className="flex flex-col gap-5 pl-2 mb-6">
                        <label className="flex items-center cursor-pointer" onClick={() => setSelectedSystem('irrigation')}>
                            <div className="flex items-center justify-center w-5 h-5 mr-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedSystem === 'irrigation' ? 'border-[#2A160C] bg-[#2A160C]' : 'border-white bg-white'}`}></div>
                            </div>
                            <svg className="w-[14px] h-[16px] text-[#2A160C] mr-2" viewBox="0 0 14 16" fill="currentColor">
                                <path d="M7 0C7 0 0 7.83333 0 11.5C0 15.0899 3.13401 16 7 16C10.866 16 14 15.0899 14 11.5C14 7.83333 7 0 7 0Z" />
                            </svg>
                            <span className="font-bold text-[16px] text-black w-[90px]">관개 시스템</span>
                            <span className="text-[14px] text-black/90">자동 물공급</span>
                        </label>

                        <label className="flex items-center cursor-pointer" onClick={() => setSelectedSystem('lighting')}>
                            <div className="flex items-center justify-center w-5 h-5 mr-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedSystem === 'lighting' ? 'border-[#2A160C] bg-[#2A160C]' : 'border-white bg-white'}`}></div>
                            </div>
                            <svg className="w-[14px] h-[16px] text-[#2A160C] mr-2" viewBox="0 0 14 16" fill="currentColor">
                                <path d="M7 0C3.68629 0 1 2.68629 1 6C1 8.23787 2.23595 10.1915 4 11.2336V13C4 13.5523 4.44772 14 5 14H9C9.55228 14 10 13.5523 10 13V11.2336C11.764 10.1915 13 8.23787 13 6C13 2.68629 10.3137 0 7 0ZM5 15C5 15.5523 5.44772 16 6 16H8C8.55228 16 9 15.5523 9 15V14.5H5V15Z" />
                            </svg>
                            <span className="font-bold text-[16px] text-black w-[90px]">조명 시스템</span>
                            <span className="text-[14px] text-black/90">자동 조명 ON/OFF</span>
                        </label>

                        <label className="flex items-center cursor-pointer" onClick={() => setSelectedSystem('ventilation')}>
                            <div className="flex items-center justify-center w-5 h-5 mr-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedSystem === 'ventilation' ? 'border-[#2A160C] bg-[#2A160C]' : 'border-white bg-white'}`}></div>
                            </div>
                            <svg className="w-[16px] h-[16px] text-[#2A160C] mr-2" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 8C8 8.55228 7.55228 9 7 9C6.44772 9 6 8.55228 6 8C6 7.44772 6.44772 7 7 7C7.55228 7 8 7.44772 8 8ZM8 8L11.5 4.5C12.5 3.5 13.5 4 14 5C14.5 6 13.5 7.5 12 8L8 8ZM8 8L4.5 11.5C3.5 12.5 4 13.5 5 14C6 14.5 7.5 13.5 8 12L8 8ZM8 8L11.5 11.5C12.5 12.5 14 11.5 14 10C14 8.5 12.5 7.5 11 8L8 8ZM8 8L4.5 4.5C3.5 3.5 2.5 4 2 5C1.5 6 2.5 7.5 4 8L8 8Z" />
                            </svg>
                            <span className="font-bold text-[16px] text-black w-[90px]">환기 시스템</span>
                            <span className="text-[14px] text-black/90">자동 팬 작동 환기,습도</span>
                        </label>

                        <label className="flex items-center cursor-pointer" onClick={() => setSelectedSystem('heating')}>
                            <div className="flex items-center justify-center w-5 h-5 mr-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedSystem === 'heating' ? 'border-[#2A160C] bg-[#2A160C]' : 'border-white bg-white'}`}></div>
                            </div>
                            <svg className="w-[10px] h-[16px] text-[#2A160C] mr-2 ml-1" viewBox="0 0 10 16" fill="currentColor">
                                <path d="M5 0C3.34315 0 2 1.34315 2 3V9.17071C0.766307 10.0658 0 11.4554 0 13C0 15.7614 2.23858 18 5 18C7.76142 18 10 15.7614 10 13C10 11.4554 9.23369 10.0658 8 9.17071V3C8 1.34315 6.65685 0 5 0ZM5 2C5.55228 2 6 2.44772 6 3V9H4V3C4 2.44772 4.44772 2 5 2ZM5 16C3.34315 16 2 14.6569 2 13C2 11.8344 2.66632 10.8258 3.65685 10.3431V9H6.34315V10.3431C7.33368 10.8258 8 11.8344 8 13C8 14.6569 6.65685 16 5 16Z" />
                            </svg>
                            <span className="font-bold text-[16px] text-black w-[90px]">난방 시스템</span>
                            <span className="text-[14px] text-black/90">자동 온도 조절</span>
                        </label>
                    </div>

                    <div className="mt-auto flex gap-4 justify-center w-full px-2">
                        <button className="bg-[#2A160C] text-white rounded-[20px] flex-1 max-w-[150px] py-4 text-[16px] font-bold" onClick={() => setStep(1)}>이전</button>
                        <button className="bg-[#2A160C] text-white rounded-[20px] flex-1 max-w-[150px] py-4 text-[16px] font-bold" onClick={() => setStep(3)}>다음</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="w-full h-full flex flex-col pb-2">
                    <BottomSheetHeader title={'스케줄 추가'} description="" />
                    <p className="text-[14px] text-black/80 text-center mb-6 tracking-tight shrink-0 mt-2">자신에게 맞는 자동화 시스템을 설정하세요.</p>

                    <div className="flex items-center mb-6 gap-4 mt-2 shrink-0">
                        <span className="text-[18px] font-bold text-black whitespace-nowrap">어떻게 작동 할까요?</span>
                        <div className="h-[2px] bg-gray-300 flex-1"></div>
                    </div>

                    <div className="flex flex-col gap-6 pl-2 mb-6 shrink-0">
                        <label className="flex items-center cursor-pointer" onClick={() => setOperationMode('time')}>
                            <div className="flex items-center justify-center w-6 h-6 mr-3">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${operationMode === 'time' ? 'border-[#2A160C] bg-[#2A160C]' : 'border-white bg-white'}`}></div>
                            </div>
                            <svg className="w-[20px] h-[20px] mr-3" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="20" height="20" rx="4" fill="#2A160C" />
                                <circle cx="10" cy="10" r="4.5" stroke="white" strokeWidth="1.5" />
                                <path d="M10 7.5V10L11.5 11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="font-bold text-[16px] text-black w-[80px]">시간 기반</span>
                            <span className="text-[14px] text-black/90 tracking-tight">특정 시간에 자동으로 실행</span>
                        </label>

                        <label className="flex items-center cursor-pointer" onClick={() => setOperationMode('condition')}>
                            <div className="flex items-center justify-center w-6 h-6 mr-3">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${operationMode === 'condition' ? 'border-[#2A160C] bg-[#2A160C]' : 'border-white bg-white'}`}></div>
                            </div>
                            <svg className="w-[20px] h-[20px] mr-3" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="20" height="20" rx="4" fill="#2A160C" />
                                <circle cx="7" cy="7" r="1.5" fill="white" />
                                <circle cx="13" cy="7" r="1.5" fill="white" />
                                <circle cx="7" cy="13" r="1.5" fill="white" />
                                <circle cx="13" cy="13" r="1.5" fill="white" />
                            </svg>
                            <span className="font-bold text-[16px] text-black w-[80px]">조건 기반</span>
                            <span className="text-[14px] text-black/90 tracking-tight">특정 조건에 자동으로 실행</span>
                        </label>
                    </div>

                    <div className="mt-auto flex gap-4 justify-center w-full px-2 shrink-0">
                        <button className="bg-[#2A160C] text-white rounded-[20px] flex-1 max-w-[150px] py-4 text-[16px] font-bold" onClick={() => setStep(2)}>이전</button>
                        <button className="bg-[#2A160C] text-white rounded-[20px] flex-1 max-w-[150px] py-4 text-[16px] font-bold" onClick={() => setStep(4)}>다음</button>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className="w-full h-full flex flex-col pb-2">
                    <BottomSheetHeader title={'스케줄 추가'} description="" />
                    <p className="text-[14px] text-black/80 text-center mb-6 tracking-tight shrink-0 mt-2">자신에게 맞는 자동화 시스템을 설정하세요.</p>

                    <div className="flex items-center mb-6 gap-4 mt-2 shrink-0">
                        <span className="text-[18px] font-bold text-black whitespace-nowrap">어떻게 작동 할까요?</span>
                        <div className="h-[2px] bg-gray-300 flex-1"></div>
                    </div>

                    <div className="flex flex-col gap-6 pl-2 mb-6 shrink-0">
                        <label className="flex items-center cursor-pointer" onClick={() => setOperationMode('time')}>
                            <div className="flex items-center justify-center w-6 h-6 mr-3">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${operationMode === 'time' ? 'border-[#2A160C] bg-[#2A160C]' : 'border-white bg-white'}`}></div>
                            </div>
                            <svg className="w-[20px] h-[20px] mr-3" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="20" height="20" rx="4" fill="#2A160C" />
                                <circle cx="10" cy="10" r="4.5" stroke="white" strokeWidth="1.5" />
                                <path d="M10 7.5V10L11.5 11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="font-bold text-[16px] text-black w-[80px]">시간 기반</span>
                            <span className="text-[14px] text-black/90 tracking-tight">특정 시간에 자동으로 실행</span>
                        </label>

                        <label className="flex items-center cursor-pointer" onClick={() => setOperationMode('condition')}>
                            <div className="flex items-center justify-center w-6 h-6 mr-3">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${operationMode === 'condition' ? 'border-[#2A160C] bg-[#2A160C]' : 'border-white bg-white'}`}></div>
                            </div>
                            <svg className="w-[20px] h-[20px] mr-3" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="20" height="20" rx="4" fill="#2A160C" />
                                <circle cx="7" cy="7" r="1.5" fill="white" />
                                <circle cx="13" cy="7" r="1.5" fill="white" />
                                <circle cx="7" cy="13" r="1.5" fill="white" />
                                <circle cx="13" cy="13" r="1.5" fill="white" />
                            </svg>
                            <span className="font-bold text-[16px] text-black w-[80px]">조건 기반</span>
                            <span className="text-[14px] text-black/90 tracking-tight">특정 조건에 자동으로 실행</span>
                        </label>
                    </div>

                    {operationMode === 'time' ? (
                        <>
                            <div className="flex items-center mb-5 gap-4 mt-2 shrink-0">
                                <span className="text-[17px] font-bold text-black whitespace-nowrap">실행 시간</span>
                                <div className="h-[2px] bg-gray-300 flex-1"></div>
                                <div className="flex items-center gap-2">
                                    <input type="text" className="w-[60px] h-[45px] bg-white rounded-[12px] text-center font-bold text-[18px] outline-none shadow-sm" value={executionHour} onChange={(e) => setExecutionHour(e.target.value)} />
                                    <span className="font-bold text-[20px] text-black">:</span>
                                    <input type="text" className="w-[60px] h-[45px] bg-white rounded-[12px] text-center font-bold text-[18px] outline-none shadow-sm" value={executionMinute} onChange={(e) => setExecutionMinute(e.target.value)} />
                                </div>
                            </div>

                            <div className="flex flex-col mb-5 shrink-0">
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-[17px] font-bold text-black whitespace-nowrap">실행 요일</span>
                                    <div className="h-[2px] bg-gray-300 flex-1"></div>
                                    <span className="text-[12px] text-gray-500 font-medium whitespace-nowrap">미선택시 매일</span>
                                </div>
                                <div className="flex justify-between w-full">
                                    {daysOfWeek.map(day => (
                                        <button key={day} onClick={() => toggleDay(day)} className={`w-[40px] h-[40px] rounded-[12px] font-bold text-[15px] flex items-center justify-center shadow-sm transition-colors ${selectedDays.includes(day) ? 'bg-[#2A160C] text-white' : 'bg-white text-black'}`}>{day}</button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center mb-4 gap-4 shrink-0">
                                <span className="text-[17px] font-bold text-black whitespace-nowrap">작동 시간</span>
                                <div className="h-[2px] bg-gray-300 flex-1"></div>
                                <div className="flex items-center justify-between w-[130px] h-[45px] bg-white rounded-[12px] px-3 shadow-sm">
                                    <button onClick={() => setOperationDuration(prev => Math.max(0, prev - 1))} className="text-[24px] font-bold text-gray-400 w-[24px] flex justify-center items-center pb-1">-</button>
                                    <span className="font-bold text-[16px] text-black">{operationDuration}분</span>
                                    <button onClick={() => setOperationDuration(prev => prev + 1)} className="text-[22px] font-bold text-[#2A160C] w-[24px] flex justify-center items-center pb-0.5">+</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center mb-5 gap-4 mt-2 shrink-0">
                                <span className="text-[17px] font-bold text-black whitespace-nowrap">센서 선택</span>
                                <div className="h-[2px] bg-gray-300 flex-1"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-5 gap-x-2 pl-2 mb-8 shrink-0">
                                {SENSORS.map((sensor) => (
                                    <label key={sensor.id} className="flex items-center cursor-pointer" onClick={() => setSelectedSensor(sensor.id)}>
                                        <div className="flex items-center justify-center w-5 h-5 mr-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedSensor === sensor.id ? 'border-[#2A160C] bg-[#2A160C]' : 'border-white bg-white'}`}></div>
                                        </div>
                                        <span className="font-bold text-[15px] text-black shrink-0">{sensor.label}</span>
                                        <span className="text-[13px] text-black/60 ml-2 font-medium shrink-0">단위: {sensor.unit}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="flex items-center mb-5 gap-4 shrink-0">
                                <span className="text-[17px] font-bold text-black whitespace-nowrap">실행 조건</span>
                                <div className="h-[2px] bg-gray-300 flex-1"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 w-full mb-3 shrink-0 px-1 h-[48px]">
                                <div className="relative w-full h-full">
                                    <select
                                        className="w-full h-full bg-white rounded-[16px] px-4 font-bold text-[15px] text-black shadow-sm outline-none appearance-none text-center cursor-pointer"
                                        value={conditionOperator}
                                        onChange={(e) => setConditionOperator(e.target.value)}
                                    >
                                        <option value="greater">보다 큰</option>
                                        <option value="less">보다 작은</option>
                                        <option value="equal">같은</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 0L12 10H0L6 0Z" fill="#2A160C" />
                                        </svg>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    placeholder="실행 조건 값"
                                    className="w-full h-full bg-white rounded-[16px] px-4 text-center font-bold text-[15px] text-black shadow-sm outline-none placeholder-gray-400"
                                    value={conditionValue}
                                    onChange={(e) => setConditionValue(e.target.value)}
                                />
                            </div>

                            <p className="text-[13px] text-[#803131] font-medium text-center mb-6 shrink-0 mt-2">
                                최적 조건 만족시 자동으로 멈춥니다.
                            </p>
                        </>
                    )}

                    <div className="mt-auto flex gap-4 justify-center w-full px-2 shrink-0">
                        <button className="bg-[#2A160C] text-white rounded-[20px] flex-1 max-w-[150px] py-4 text-[16px] font-bold" onClick={() => setStep(3)}>이전</button>
                        <button className="bg-[#2A160C] text-white rounded-[20px] flex-1 max-w-[150px] py-4 text-[16px] font-bold" onClick={() => setIsModalOpen(true)}>완료</button>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent px-8">
                    <div className="bg-white rounded-[30px] w-full max-w-[340px] pt-10 pb-8 px-6 flex flex-col items-center shadow-xl">
                        <img
                            src={ConfirmPng}
                            alt="성공 모달 캐릭터"
                            className="w-[180px] h-auto mb-6 object-contain"
                        />
                        <div className="text-[#2A160C] text-[18px] font-extrabold mb-8 text-center">
                            스케줄이 성공적으로 설정 되었습니다!
                        </div>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-[#2A160C] text-white w-[130px] py-3 rounded-full text-[16px] font-bold transition-transform active:scale-95"
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SchedulePage;