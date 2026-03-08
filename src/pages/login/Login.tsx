import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/axios';
import changeProfileBtn from '@/assets/image/login/changeprofile.png';
import background from '@/assets/image/login/background.png';
import profileImg from '@/assets/image/login/profile.png';

import profile1 from '@/assets/image/profile/profile1.png';
import profile2 from '@/assets/image/profile/profile2.png';
import profile3 from '@/assets/image/profile/profile3.png';
import profile4 from '@/assets/image/profile/profile4.png';

interface EyeIconProps {
  visible: boolean;
  onClick: () => void;
}

const EyeIcon = ({ visible, onClick }: EyeIconProps) => (
  <svg
    onClick={onClick}
    className="w-[20px] h-[20px] cursor-pointer text-[#9A9A9A]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {visible ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    )}
    {visible && (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-1.543 0-3.01-.35-4.343-1.025"
      />
    )}
  </svg>
);

interface CheckIconProps {
  checked: boolean;
  onClick: () => void;
}

const CheckIcon = ({ checked, onClick }: CheckIconProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-[24px] h-[24px] items-center justify-center rounded-[999px] border transition-colors ${checked ? 'bg-[#2A170C] border-[#2A170C]' : 'bg-white border-[#CFC8B8]'
      }`}
  >
    {checked && (
      <svg
        className="w-[14px] h-[14px] text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    )}
  </button>
);

export default function Login() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [keepLogin, setKeepLogin] = useState(false);

  const [isProfileSelectOpen, setIsProfileSelectOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({
    src: profileImg,
    id: 'default',
  });

  const profileOptions = [
    { src: profile1, id: 'profile1' },
    { src: profile2, id: 'profile2' },
    { src: profile3, id: 'profile3' },
    { src: profile4, id: 'profile4' },
  ];

  const handleLogin = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    try {
      const res = await api.post('/auth/login', { email, password });
      const { accessToken, refreshToken, nickname, id } = res.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('id', id);

      if (selectedProfile.id !== 'default') {
        await api.post('/auth/profile/image', { image: selectedProfile.id }).catch(() => { });
      }

      navigate('/home');
    } catch {
      alert('로그인에 실패했습니다.');
    }
  };

  const handleSignup = async () => {
    if (!email || !password || !passwordConfirm || !name) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      await api.post('/auth/signup', {
        email,
        password,
        nickname: name,
        phoneNumber: '010-0000-0000',
      });
      alert('회원가입이 완료되었습니다.');
      setIsSignup(false);
      setIsProfileSelectOpen(false);
    } catch {
      alert('회원가입에 실패했습니다.');
    }
  };

  const inputClass =
    'mb-[18px] h-[58px] w-full rounded-[16px] bg-white px-[24px] text-[14px] text-[#333] outline-none placeholder:text-[#9A9A9A]';

  const pwWrapClass =
    'mb-[18px] flex h-[58px] w-full items-center rounded-[16px] bg-white px-[24px]';

  return (
    <div className="pageContainer bg-[#ECE6D9] min-h-screen flex flex-col relative overflow-hidden">
      <div className="relative bg-[#2A170C] pt-[24px]">
        <img src={background} alt="background" className="block w-full object-cover" />
      </div>

      <div
        className={`relative rounded-t-[30px] bg-[#ECE6D9] px-[24px] pb-[40px] transition-all flex-grow flex flex-col ${isSignup ? '-mt-[110px] pt-[24px]' : '-mt-[24px] pt-[76px]'
          }`}
      >
        {!isSignup && (
          <div className="absolute -top-[65px] right-[36px] z-10 flex flex-col items-center gap-[8px]">
            <img src={profileImg} alt="profile" className="w-[100px]" draggable={false} />
          </div>
        )}

        {isSignup && (
          <div className="mb-[24px] flex justify-center items-center gap-[18px]">
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-white">
              <img src={selectedProfile.src} alt="profile" className="w-full h-full object-cover" draggable={false} />
            </div>
            <img
              src={changeProfileBtn}
              alt="change"
              className="w-[160px] cursor-pointer"
              draggable={false}
              onClick={() => setIsProfileSelectOpen(true)}
            />
          </div>
        )}

        {isSignup && isProfileSelectOpen ? (
          <div className="bg-white rounded-t-[30px] -mx-[24px] px-[24px] pt-[24px] mt-[10px] flex-1 flex flex-col relative z-0">
            <div className="absolute top-0 left-0 w-full h-[150vh] bg-white -z-10 rounded-t-[30px]"></div>
            <div className="w-[80px] h-[4px] bg-[#CFC8B8] rounded-full mx-auto mb-[40px]" />

            <div className="grid grid-cols-[144px_144px] justify-center gap-x-[32px] gap-y-[24px]">
              {profileOptions.map((prof, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedProfile(prof);
                    setIsProfileSelectOpen(false);
                  }}
                  className={`w-[144px] h-[144px] rounded-full overflow-hidden cursor-pointer box-border flex items-center justify-center transition-all
                    ${selectedProfile.id === prof.id ? 'border-[4px] border-[#2A170C]' : 'border-[4px] border-transparent'}
                  `}
                >
                  <img src={prof.src} alt={`profile option ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex-grow"></div>
          </div>
        ) : (
          /* 기존 입력폼 화면 */
          <>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e-mail"
              className={inputClass}
            />

            {isSignup && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
                className={inputClass}
              />
            )}

            <div className={pwWrapClass}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="flex-1 text-[14px] text-[#333] outline-none bg-transparent placeholder:text-[#9A9A9A]"
              />
              <EyeIcon visible={showPassword} onClick={() => setShowPassword(!showPassword)} />
            </div>

            {isSignup && (
              <div className={pwWrapClass}>
                <input
                  type={showPasswordConfirm ? 'text' : 'password'}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="password confirm"
                  className="flex-1 text-[14px] text-[#333] outline-none bg-transparent placeholder:text-[#9A9A9A]"
                />
                <EyeIcon visible={showPasswordConfirm} onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} />
              </div>
            )}

            {!isSignup && (
              <div
                className="mb-[24px] ml-[4px] flex items-center cursor-pointer"
                onClick={() => setKeepLogin(!keepLogin)}
              >
                <CheckIcon checked={keepLogin} onClick={() => setKeepLogin(!keepLogin)} />
                <span className="ml-[8px] text-[14px] text-[#7A7A7A]">로그인 상태 유지</span>
              </div>
            )}

            {isSignup ? (
              <button
                type="button"
                onClick={handleSignup}
                className="mb-[28px] h-[58px] w-full rounded-[16px] bg-[#2A170C] text-[18px] font-bold text-white"
              >
                SIGN UP
              </button>
            ) : (
              <button
                type="button"
                onClick={handleLogin}
                className="mb-[32px] h-[58px] w-full rounded-[16px] bg-[#2A170C] text-[18px] font-bold text-white"
              >
                LOG IN
              </button>
            )}

            <div className="mb-[26px] h-[2px] bg-[#B8B2A6] w-full" />

            {!isSignup && (
              <div className="mb-[26px] flex justify-center gap-[28px] text-[13px] text-[#9A9A9A]">
                <button type="button">아이디 찾기</button>
                <button type="button">비밀번호 재설정</button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignup(true);
                    setIsProfileSelectOpen(false);
                  }}
                >
                  회원가입
                </button>
              </div>
            )}

            <button
              className="mb-[44px] h-[58px] w-full rounded-[16px] bg-[#FEE500] text-[20px] font-bold text-[#191919]"
            >
              카카오톡으로 시작하기
            </button>

            <div className="flex-grow"></div>
          </>
        )}

        <p className="relative z-10 text-[13px] text-center text-[#9A9A9A] mt-auto">
          Smart FARM, Smart US.
        </p>

      </div>
    </div>
  );
}