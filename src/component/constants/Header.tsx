import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

import HeaderIcon from '../../../public/icons/HedartIcon.svg';

interface Props {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: Props) => {
  return (
    <div className="w-full h-[52px] bg-[#E8E2D5] flex items-center justify-between px-10 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
      <Link to={'/home'}>
        <img src={HeaderIcon} alt="header-icon" />
      </Link>

      <button
        onClick={onMenuClick}
        className="p-2 -mr-2 active:scale-90 transition-transform"
      >
        <Icon
          icon="material-symbols:menu-rounded"
          className="text-[24px] text-black"
        />
      </button>
    </div>
  );
};

export default Header;
