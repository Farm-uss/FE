// component/farm/detail/FarmNavTab.tsx
import { Icon } from '@iconify/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const FarmNavTab = () => {
  const { farmId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="flex justify-center items-center gap-6 shrink-0 py-4">
      <MenuIcon
        icon="material-symbols:grid-view-outline-rounded"
        onClick={() => navigate(`/farm/${farmId}`)}
        active={isActive(`/farm/${farmId}`)}
      />
      <MenuIcon
        icon="material-symbols:photo-camera-outline-rounded"
        onClick={() => navigate(`/farm/${farmId}/streaming`)}
        active={isActive(`/farm/${farmId}/streaming`)}
      />
      <MenuIcon
        icon="material-symbols:sound-detection-glass-break-rounded"
        onClick={() => navigate(`/farm/${farmId}/growthTraking`)}
        active={isActive(`/farm/${farmId}/growthTraking`)}
      />
      <MenuIcon icon="material-symbols:bug-report" onClick={() => {}} />
      <MenuIcon
        icon="material-symbols:calendar-view-month-outline"
        onClick={() => {}}
      />
      <MenuIcon icon="material-symbols:calendar-clock" onClick={() => {}} />
    </nav>
  );
};

const MenuIcon = ({
  icon,
  onClick,
  active = false,
}: {
  icon: string;
  onClick: () => void;
  active?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`w-20 h-20 rounded-2xl shrink-0 flex items-center justify-center transition-all ${
      active
        ? 'bg-[#8B8880] text-white shadow-md'
        : 'bg-white text-[#8B8880] border border-[#8B8880]/20'
    }`}
  >
    <Icon icon={icon} className="text-[30px]" />
  </button>
);

export default FarmNavTab;
