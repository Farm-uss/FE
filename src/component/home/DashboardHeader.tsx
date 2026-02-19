import mainImg2 from '../../../public/img/MainImg2.svg';

interface Props {
  nickname: string;
}

const DashboardHeader = ({ nickname }: Props) => (
  <div className="relative w-full h-[320px] shrink-0 bg-[#E6E0D3]">
    <div className="absolute inset-0 z-0 flex items-end">
      <img
        src={mainImg2}
        alt="Background"
        className="w-full h-auto object-contain"
      />
    </div>
    <div className="relative z-10 p-12 pt-20">
      <h1 className="text-h-24b text-black uppercase">HELLO, {nickname}!</h1>
      <p className="text-h-18sb text-black mt-1">
        당신의 농장을 관리 해주세요!
      </p>
    </div>
  </div>
);

export default DashboardHeader;
