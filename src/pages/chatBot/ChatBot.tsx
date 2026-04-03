import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✨ 이동을 위해 추가

import CommonHeader from '@/component/constants/CommonHeader'; // ✨ 형이 만든 헤더 임포트

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
  const scrollRef = useRef<HTMLDivElement>(null);

  // 메시지 추가될 때마다 하단 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now(), text: inputValue, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: `안녕하세요, 동열님!\n저는 팜어스 봇입니다!`,
        isBot: true,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-[#F4F1EA] overflow-hidden px-6 pt-6">
      {/* ✨ 형이 만든 공통 헤더 적용! */}
      <CommonHeader
        title="팜어스 봇"
        onPrev={() => navigate(-1)} // 뒤로가기 기능 연결
      />

      {/* 메인 컨텐츠 영역 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-8 space-y-6 scroll"
      >
        {messages.length === 0 ? (
          /* --- 시작 화면 (시안 왼쪽) --- */
          <div className="flex flex-col items-center justify-center h-full gap-10 animate-in fade-in duration-700">
            {/* 캐릭터 이미지 */}
            <img src={chatbotImg} alt="팜어스 봇" className="w-100" />
          </div>
        ) : (
          /* --- 채팅 화면 (시안 오른쪽) --- */
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
          </div>
        )}
      </div>

      {/* 입력 영역 (하단 고정) */}
      <div className="py-6 bg-[#E8E2D5] -mx-6 px-6 rounded-t-[20px] shadow-inner shrink-0">
        <div className="flex items-center gap-3 bg-white rounded-full px-5 py-2 shadow-sm border border-[#20110A]/5">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return;

              if (e.key === 'Enter') {
                handleSend();
              }
            }}
            placeholder="채팅을 입력해주세요."
            className="flex-1 bg-transparent outline-none py-2 text-b-14m text-[#20110A] placeholder:text-[#20110A]/30"
          />
          <button
            onClick={handleSend}
            className="bg-[#20110A] text-white px-5 py-2 rounded-2xl text-b-14b active:scale-95 transition-transform shrink-0"
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
