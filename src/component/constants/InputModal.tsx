import { useState } from 'react';

import character from '../../assets/image/common/character2.svg';

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;
  title: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  cancelText?: string;
  initialValue?: string;
}

const InputModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  placeholder = '내용을 입력해주세요',
  buttonText = '확인',
  cancelText = '취소',
  initialValue = '',
}: InputModalProps) => {
  const [inputValue, setInputValue] = useState(initialValue);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(inputValue);
    setInputValue('');
    onClose();
  };

  const handleCancel = () => {
    setInputValue(initialValue); // 원래 값으로 복구
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-8 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#E8E2D5] w-full max-w-[320px] rounded-[40px] p-8 flex flex-col items-center gap-6 shadow-2xl">
        <div className="w-60 h-60 flex items-center justify-center">
          <img
            src={character}
            alt="modal-icon"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="text-center w-full space-y-1">
          <h3 className="text-h-20b text-[#20110A] break-keep">{title}</h3>
          {description && (
            <p className="text-c-12m text-[#20110A]/60 break-keep">
              {description}
            </p>
          )}
        </div>

        <div className="w-full">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            className="w-full h-[52px] bg-white rounded-2xl px-4 text-center text-b-16sb text-[#20110A] outline-none border-2 border-transparent focus:border-[#20110A] transition-all placeholder:text-[#20110A]/20"
            autoFocus
          />
        </div>

        <div className="flex gap-3 w-full">
          <button
            onClick={handleConfirm}
            disabled={!inputValue.trim()}
            className="flex-1 h-[52px] bg-[#20110A] text-white rounded-full text-b-16b active:scale-95 transition-all shadow-lg disabled:opacity-30"
          >
            {buttonText}
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 h-[52px] bg-white text-[#20110A] rounded-full text-b-16b border border-[#20110A]/20 active:scale-95 transition-all"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
