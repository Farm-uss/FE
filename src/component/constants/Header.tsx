import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';

import { storage } from '@/utils/storage';

import HeaderIcon from '../../assets/icons/common/HedartIcon.svg';
import NotificationBell from './NotificationBell';

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!storage.getAccessToken();

  return (
    <div className="w-full h-[52px] bg-[#E8E2D5] flex items-center justify-between px-6 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
      <Link to={isLoggedIn ? '/home' : '/'}>
        <img src={HeaderIcon} alt="header-icon" className="w-auto h-auto" />
      </Link>

      <div className="flex items-center gap-1">
        {isLoggedIn ? (
          <>
            <NotificationBell />
            <button
              onClick={onMenuClick}
              className="p-2 -mr-2 active:scale-90 transition-transform"
            >
              <Icon
                icon="material-symbols:menu-rounded"
                className="text-[28px] text-[#20110A]"
              />
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="text-c-10m text-[#20110A] bg-white rounded-2xl transition-opacity"
          >
            로그인
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
