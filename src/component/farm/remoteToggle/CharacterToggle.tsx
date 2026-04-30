import ControlToggleBtn from '@/assets/icons/farm/ControlToggleBtn.svg';

interface CharacterToggleProps {
  isOn: boolean;
  onClick: () => void;
}

const CharacterToggle = ({ isOn, onClick }: CharacterToggleProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative w-[72px] h-[38px] rounded-full transition-colors duration-300 shrink-0 ${
      isOn ? 'bg-[#648E2E]' : 'bg-[#D9D3C8]'
    }`}
  >
    <img
      src={ControlToggleBtn}
      alt="toggle"
      draggable={false}
      className={`absolute top-[4px] w-[30px] h-[30px] transition-all duration-300 ${
        isOn ? 'right-[4px]' : 'left-[4px]'
      }`}
    />
  </button>
);

export default CharacterToggle;
