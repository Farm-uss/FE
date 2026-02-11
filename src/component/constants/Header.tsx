import HeaderIcon from '../../../public/icons/HedartIcon.svg';

const Header = () => {
  return (
    <div className="w-full h-[52px] bg-[#E8E2D5] flex items-center justify-between px-10 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
      <img src={HeaderIcon} alt="header-icon" />
      <span className="text-h-18b">Header</span>
      <div className="w-6" /> {/* 우측 정렬 균형 맞추기용 */}
    </div>
  );
};
export default Header;
