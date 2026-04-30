import { useEffect, useState } from 'react';

import profile1 from '@/assets/image/profile/profile1.webp';
import profile2 from '@/assets/image/profile/profile2.webp';
import profile3 from '@/assets/image/profile/profile3.webp';
import profile4 from '@/assets/image/profile/profile4.webp';
import type { ProfileOption } from '@/types/user';

export const profileOptions: ProfileOption[] = [
  { src: profile1, id: '1' },
  { src: profile2, id: '2' },
  { src: profile3, id: '3' },
  { src: profile4, id: '4' },
];

interface ProfileSelectSheetProps {
  selectedId?: string;
  onSelect: (profile: ProfileOption) => void;
  onClose: () => void;
}

const ProfileSelectSheet = ({
  selectedId,
  onSelect,
  onClose,
}: ProfileSelectSheetProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleSelect = (profile: ProfileOption) => {
    setIsVisible(false);
    setTimeout(() => onSelect(profile), 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      onClick={handleClose}
    >
      <div
        className={`w-full max-w-[430px] bg-white rounded-t-[30px] pt-[20px] px-[24px] pb-[60px] transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[60px] h-[4px] bg-[#CFC8B8] rounded-full mx-auto mb-[32px]" />
        <div className="grid grid-cols-2 gap-[20px]">
          {profileOptions.map((prof, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(prof)}
              className={`aspect-square rounded-full overflow-hidden cursor-pointer transition-all
                ${
                  selectedId === prof.id
                    ? 'ring-[5px] ring-[#2A170C]'
                    : 'ring-[5px] ring-transparent'
                }
              `}
            >
              <img
                src={prof.src}
                alt={`profile option ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSelectSheet;
