import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

import axiosInstance from '@/apis/axios';
import FarmCard from '@/component/home/FarmCard';

import mainImg2 from '../../../public/img/MainImg2.svg';
// 서버 응답 데이터 타입 정의
interface Member {
  userId: number;
  userName: string;
  role: 'OWNER' | 'MEMBER';
}

interface FarmResponse {
  farmId: number;
  name: string;
  location: string;
  ownerName: string;
  memberCount: number;
  members: Member[];
  crops: string[];
  role: 'OWNER' | 'MEMBER';
  createdDate: string;
}

const DashboardMain = () => {
  const [farms, setFarms] = useState<FarmResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const res = await axiosInstance.get('/farms/my');

        // 콘솔로 데이터 생김새 꼭 확인해봐 형!
        console.log('실제 서버 응답:', res.data);

        // 데이터가 바로 배열로 오는지, result 안에 배열이 있는지 체크
        if (Array.isArray(res.data)) {
          setFarms(res.data);
        } else if (res.data && Array.isArray(res.data.result)) {
          // 보통 이 경우가 많아!
          setFarms(res.data.result);
        } else {
          setFarms([]); // 데이터가 없거나 형식이 다르면 빈 배열로 세팅해서 에러 방지
        }
      } catch (err) {
        console.error('데이터 못 가져왔어 형:', err);
        setFarms([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFarms();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white text-b-16m">
        데이터 불러오는 중... 잠시만!
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* --- 상단 영역 (이미지 + 인사말) --- */}
      <div className="relative w-full h-[320px] shrink-0 bg-[#E6E0D3]">
        <div className="absolute inset-0 z-0 flex items-end">
          <img
            src={mainImg2}
            alt="Dashboard Background"
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="relative z-10 p-12 pt-20">
          <h1 className="text-h-24b text-black leading-tight">HELLO, 동열!</h1>
          <p className="text-h-18sb text-black mt-1">
            당신의 농장을 관리 해주세요!
          </p>
        </div>
      </div>

      {/* --- 하단 리포트 영역 --- */}
      <div className="flex-1 bg-white px-6 pt-10 pb-10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] relative z-20">
        {/* 1. 내 농장 한눈에 보기 (실제 계산된 값 적용) */}
        <section className="mb-10">
          <div className="text-b-14m text-black mb-6">내 농장 한눈에 보기</div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: '총 농장', value: '19' },

              { label: '내가 만든 농장', value: '07' },

              { label: '초대 받은 농장', value: '12' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-full h-[85px] bg-[#E6E0D3] rounded-[18px] flex items-center justify-center border border-dashed border-[#20110A]">
                  <span className="text-h-28b text-black">{item.value}</span>
                </div>

                <span className="text-c-12b text-black-60 mt-2 text-center">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-[#8B8880] mb-8" />

        {/* 2. My FARM 섹션 */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-b-14m text-[#20110A]">My FARM</h2>
            <button className="text-c-10m text-black-60 bg-[#E6E0D3] py-1 rounded-full w-[85px] h-[30px]">
              농장 관리로 이동
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 px-2 scroll scrollbar-hide snap-x snap-mandatory">
            {/* 서버에서 받아온 리얼 데이터 리스트 */}
            {farms.map((farm) => (
              <div key={farm.farmId} className="snap-center shrink-0">
                <FarmCard
                  name={farm.name}
                  ownerName={farm.ownerName}
                  extraMemberCount={farm.memberCount} // 서버 응답 값 매핑
                  location={farm.location}
                  cropName={farm.crops[0] || '작물 없음'} // 첫 번째 작물 노출
                />
              </div>
            ))}

            {/* --- 농장 추가 카드 --- */}
            <div className="snap-center shrink-0">
              <button
                onClick={() => console.log('농장 추가 페이지로 이동!')}
                className="bg-[#F4F1EA] w-[260px] h-[150px] rounded-[16px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-4 hover:bg-[#ede9de] transition-colors"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Icon
                    icon="material-symbols:add"
                    className="text-[28px] text-gray-400"
                  />
                </div>
                <span className="text-[12px] font-bold text-gray-400">
                  나만의 농장을 추가 해주세요!
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <div className="mt-16 pb-4 text-center">
          <p className="text-c-12m text-gray-300 tracking-widest">
            Smart FARM, Smart US.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
