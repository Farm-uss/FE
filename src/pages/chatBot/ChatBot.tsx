import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { sendChatMessage } from '@/apis/chatbotService';
import CommonHeader from '@/component/constants/CommonHeader';

import chatbotImg from '../../../src/assets/image/chatbot/chatbotImg.svg';
import chatImg from '../../../src/assets/image/chatbot/chatImg.svg';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const ChatBot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now(), text: inputValue, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    const messageToSend = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const answer = await sendChatMessage(messageToSend);
      const botMsg: Message = { id: Date.now() + 1, text: answer, isBot: true };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errMsg: Message = {
        id: Date.now() + 1,
        text: '죄송해요, 응답을 가져오지 못했어요. 다시 시도해주세요.',
        isBot: true,
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F4F1EA] overflow-hidden px-6 pt-6">
      <CommonHeader title="팜어스 봇" onPrev={() => navigate(-1)} />

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-8 space-y-6 scroll"
      >
        {messages.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-10 animate-in fade-in duration-700">
            <img src={chatbotImg} alt="팜어스 봇" className="w-100" />
          </div>
        ) : (
          <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 duration-500">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                {msg.isBot && (
                  <div className="w-18 h-18 rounded-full bg-[#FFD700] flex items-center justify-center shrink-0 border border-[#20110A]/10 overflow-hidden">
                    <img src={chatImg} className="w-12 h-12" />
                  </div>
                )}
                <div
                  className={`
                    max-w-[70%] px-5 py-3 rounded-[20px] text-b-14m whitespace-pre-wrap leading-relaxed shadow-sm
                    ${
                      msg.isBot
                        ? 'bg-[#E8E2D5] text-[#20110A] rounded-tl-none'
                        : 'bg-[#20110A] text-white rounded-tr-none'
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* 로딩 버블 */}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-18 h-18 rounded-full bg-[#FFD700] flex items-center justify-center shrink-0 border border-[#20110A]/10 overflow-hidden">
                  <img src={chatImg} className="w-12 h-12" />
                </div>
                <div className="bg-[#E8E2D5] px-5 py-4 rounded-[20px] rounded-tl-none shadow-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#20110A]/30 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-[#20110A]/30 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-[#20110A]/30 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 입력 영역 */}
      <div className="py-6 bg-[#E8E2D5] -mx-6 px-6 rounded-t-[20px] shadow-inner shrink-0">
        <div className="flex items-center gap-3 bg-white rounded-full px-5 py-2 shadow-sm border border-[#20110A]/5">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return;
              if (e.key === 'Enter') handleSend();
            }}
            disabled={isLoading}
            placeholder="채팅을 입력해주세요."
            className="flex-1 bg-transparent outline-none py-2 text-b-14m text-[#20110A] placeholder:text-[#20110A]/30 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-[#20110A] text-white px-5 py-2 rounded-2xl text-b-14b active:scale-95 transition-transform shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            보내기
          </button>
        </div>
        <p className="text-center text-[10px] text-[#20110A]/40 mt-4 tracking-widest font-medium">
          Smart FARM, Smart US.
        </p>
      </div>
    </div>
  );
};

export default ChatBot;
