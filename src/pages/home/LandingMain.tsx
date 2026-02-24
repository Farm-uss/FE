import { Link } from 'react-router-dom';

import flowerGreen from '../../assets/icons/home/flowerGreen.svg';
import flowerYellowgreen from '../../assets/icons/home/flowerYellowgreen.svg';
import mianLogo from '../../assets/image/common/MainLogo.svg';
import mainImg from '../../assets/image/main/mainImg1.svg';

const LandingMain = () => {
  return (
    <div className="pageContainer bg-[#E6E0D3] relative">
      {/* 초록색 꽃 */}
      <img
        src={flowerGreen}
        className="absolute left-[17px] top-[47px] w-[90px] h-[90px] z-10 object-contain"
        alt="flower green"
      />

      {/* 연두색 꽃 */}
      <img
        src={flowerYellowgreen}
        className="absolute left-[317px] top-[128px] w-[70px] h-[70px] z-10 object-contain"
        alt="flower yellowgreen"
      />

      {/* 상단 텍스트 및 로고 영역 */}
      <div className="flex-1 flex flex-col justify-end items-center px-[20px] relative z-0">
        <div className="flex flex-col gap-8 w-full justify-center items-center text-center">
          <img
            src={mianLogo}
            className="h-[73px] w-[275px] object-contain"
            alt="Farm-us Logo"
          />

          <div className="flex flex-col gap-4 w-full justify-center items-center">
            <div className="text-heading-20B text-[#165226]">
              Smart FARM, Smart US.
            </div>

            <div className="max-w-[320px] text-body-14M text-gray-700 leading-relaxed break-keep">
              "당신의 일상에 기분 좋은 스마트함을 더합니다."
              <br />
              농장은 똑똑해지고, 당신의 손길은 한결 가벼워집니다. <br />
              Farm-us와 함께라면 복잡한 준비 없이도 나만의 작은 농장이 완성돼요.
            </div>

            <Link
              className="bg-[#165226] text-white w-[200px] h-[56px] flex items-center justify-center rounded-[66px] mt-2 text-body-16B shadow-lg"
              to={'/login'}
            >
              Start
            </Link>
          </div>
        </div>
      </div>

      {/* 하단 이미지 영역 */}
      <div className="flex-1 flex items-end overflow-hidden">
        <img
          src={mainImg}
          alt="Main Farm Illustration"
          className="w-full h-auto object-contain origin-bottom"
        />
      </div>
    </div>
  );
};

export default LandingMain;
