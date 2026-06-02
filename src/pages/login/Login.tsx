import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/axios';
import background from '@/assets/image/login/background.webp';
import changeProfileBtn from '@/assets/image/login/changeprofile.png';
import profileImg from '@/assets/image/login/profile.png';
import profile1 from '@/assets/image/profile/profile1.webp';
import profile2 from '@/assets/image/profile/profile2.webp';
import profile3 from '@/assets/image/profile/profile3.webp';
import profile4 from '@/assets/image/profile/profile4.webp';
import { usePushNotification } from '@/hooks/usePushNotification';
import { storage } from '@/utils/storage';

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
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </>
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88"
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
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M5 13l4 4L19 7"
        />
      </svg>
    )}
  </button>
);

export default function Login() {
  const navigate = useNavigate();
  const { subscribe } = usePushNotification();
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
    { src: profile1, id: '1' },
    { src: profile2, id: '2' },
    { src: profile3, id: '3' },
    { src: profile4, id: '4' },
  ];

  const handleLogin = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    try {
      const res = await api.post('/auth/login', { email, password });
      const { accessToken, refreshToken, nickname, id } = res.data;
      storage.setAccessToken(accessToken);
      storage.setRefreshToken(refreshToken);
      storage.setNickname(nickname);
      storage.setId(id);
      await subscribe();
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
        phoneNumber: '010-1111-1111',
        profileImageIds:
          selectedProfile.id === 'default' ? [] : [selectedProfile.id],
      });
      alert('회원가입이 완료되었습니다.');
      setIsSignup(false);
      setIsProfileSelectOpen(false);
      setSelectedProfile({ src: profileImg, id: 'default' });
    } catch {
      alert('회원가입에 실패했습니다.');
    }
  };

  const handleKakaoLogin = () => {
    const jsKey = import.meta.env.VITE_KAKAO_JS_KEY;

    if (!window.Kakao) {
      alert('카카오 SDK를 불러오지 못했습니다. 새로고침 후 다시 시도해주세요.');
      return;
    }
    if (!jsKey) {
      alert('카카오 앱 키가 설정되지 않았습니다. (.env 확인)');
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(jsKey);
    }

    window.Kakao.Auth.authorize({
      redirectUri:
        import.meta.env.VITE_KAKAO_REDIRECT_URI ||
        `${window.location.origin}/oauth/kakao`,
    });
  };

  const inputClass =
    'mb-[18px] h-[58px] w-full rounded-[16px] bg-white px-[24px] text-[14px] text-[#333] outline-none placeholder:text-[#9A9A9A]';

  const pwWrapClass =
    'mb-[18px] flex h-[58px] w-full items-center rounded-[16px] bg-white px-[24px]';

  return (
    <div className="pageContainer bg-[#ECE6D9] min-h-screen flex flex-col relative overflow-hidden">
      <div className="relative bg-[#2A170C] pt-[24px]">
        <img
          src={background}
          alt="background"
          className="block w-full object-cover"
        />
      </div>

      <div
        className={`relative rounded-t-[30px] bg-[#ECE6D9] px-[24px] pb-[40px] transition-all flex-grow flex flex-col ${isSignup ? '-mt-[110px] pt-[24px]' : '-mt-[24px] pt-[76px]'
          }`}
      >
        {!isSignup && (
          <div className="absolute -top-[65px] right-[36px] z-10 flex flex-col items-center gap-[8px]">
            <img
              src={profileImg}
              alt="profile"
              className="w-[100px]"
              draggable={false}
            />
          </div>
        )}

        {isSignup && (
          <div className="mb-[24px] flex justify-center items-center gap-[18px]">
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-white">
              <img
                src={selectedProfile.src}
                alt="profile"
                className="w-full h-full object-cover"
                draggable={false}
              />
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
                  <img
                    src={prof.src}
                    alt={`profile option ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex-grow"></div>
          </div>
        ) : (
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
              <EyeIcon
                visible={showPassword}
                onClick={() => setShowPassword(!showPassword)}
              />
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
                <EyeIcon
                  visible={showPasswordConfirm}
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                />
              </div>
            )}

            {!isSignup && (
              <div
                className="mb-[24px] ml-[4px] flex items-center cursor-pointer"
                onClick={() => setKeepLogin(!keepLogin)}
              >
                <CheckIcon
                  checked={keepLogin}
                  onClick={() => setKeepLogin(!keepLogin)}
                />
                <span className="ml-[8px] text-[14px] text-[#7A7A7A]">
                  로그인 상태 유지
                </span>
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
              type="button"
              onClick={handleKakaoLogin}
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
