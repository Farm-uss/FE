import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/axios';
import changeProfileBtn from '@/assets/image/login/changeprofile.png';
import farmusLogo from '@/assets/image/login/farmus.png';
import ground1 from '@/assets/image/login/ground1.png';
import ground2 from '@/assets/image/login/ground2.png';
import kakaoLoginBtn from '@/assets/image/login/kakaologin.png';
import loginBtn from '@/assets/image/login/login.png';
import profileImg from '@/assets/image/login/profile.png';

export default function Login() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');

  /* ================= 로그인 ================= */
  const handleLogin = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const res = await api.post('/auth/login', {
        email,
        password,
      });

      const { accessToken, refreshToken, nickname, id } = res.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('id', id);

      navigate('/home');
    } catch {
      alert('로그인에 실패했습니다.');
    }
  };

  /* ================= 회원가입 ================= */
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
    } catch {
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="pageContainer bg-[#ECE6D9]">
      {/* 상단 배경 */}
      <div className="relative bg-[#2A170C]">
        <img
          src={farmusLogo}
          alt="farmus logo"
          className="absolute left-4 top-4 z-10 w-[92px]"
          draggable={false}
        />
        <img src={ground1} alt="ground1" className="block w-full" />
        <img src={ground2} alt="ground2" className="block w-full" />
      </div>

      {/* 카드 */}
      <div className="relative -mt-6 rounded-t-[28px] bg-[#ECE6D9] px-6 pt-14 pb-10">
        {/* 프로필 */}
        <div className="absolute -top-12 right-4 z-10 flex flex-col items-center gap-2">
          <img
            src={profileImg}
            alt="profile"
            className="w-[88px]"
            draggable={false}
          />
          {isSignup && (
            <img
              src={changeProfileBtn}
              alt="change profile"
              className="w-[120px]"
              draggable={false}
            />
          )}
        </div>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e-mail"
          className="mb-5 h-[64px] w-full rounded-[24px] bg-white px-6 text-[15px] outline-none"
        />

        {isSignup && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            className="mb-5 h-[64px] w-full rounded-[24px] bg-white px-6 text-[15px] outline-none"
          />
        )}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="mb-5 h-[64px] w-full rounded-[24px] bg-white px-6 text-[15px] outline-none"
        />

        {isSignup && (
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="password confirm"
            className="mb-5 h-[64px] w-full rounded-[24px] bg-white px-6 text-[15px] outline-none"
          />
        )}

        <img
          src={loginBtn}
          alt={isSignup ? 'sign up' : 'login'}
          className="mb-6 block w-full cursor-pointer"
          draggable={false}
          onClick={isSignup ? handleSignup : handleLogin}
        />

        <div className="mb-5 h-px bg-[#CFC8B8]" />

        {!isSignup ? (
          <div className="mb-7 flex justify-between text-[13px] text-[#8A8A8A]">
            <span>아이디 찾기</span>
            <span>비밀번호 재설정</span>
            <button
              type="button"
              onClick={() => setIsSignup(true)}
              className="text-[#8A8A8A]"
            >
              회원가입
            </button>
          </div>
        ) : (
          <div className="mb-7 text-center">
            <button
              type="button"
              onClick={() => setIsSignup(false)}
              className="text-[13px] text-[#8A8A8A]"
            >
              로그인으로 돌아가기
            </button>
          </div>
        )}

        <img
          src={kakaoLoginBtn}
          alt="kakao login"
          className="mb-8 block w-full"
          draggable={false}
        />

        <p className="text-center text-[13px] text-[#9A9A9A]">
          Smart FARM, Smart US.
        </p>
      </div>
    </div>
  );
}
