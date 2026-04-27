import { Icon } from '@iconify/react';
import { useState } from 'react';

export const AccordionItem = ({
  title,
  contents,
}: {
  title: string;
  contents: string[];
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full bg-white rounded-2xl p-5 shadow-sm overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-b-16b text-[#20110A]"
      >
        <span>{title}</span>
        <Icon
          icon="material-symbols:arrow-drop-down-rounded"
          className={`text-5xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="flex flex-col gap-3 mt-4 animate-in slide-in-from-top-2 duration-300 max-h-52 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200">
          {contents.map((text, i) => (
            <div
              key={i}
              className="bg-[#E8E2D5]/50 p-4 rounded-xl text-c-12m text-[#20110A]/80 leading-snug shrink-0"
            >
              {text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
