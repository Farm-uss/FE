import { useState } from 'react';

import changeProfileBtn from '@/assets/image/login/changeprofile.png';
import farmusLogo from '@/assets/image/login/farmus.png';
import ground1 from '@/assets/image/login/ground1.png';
import ground2 from '@/assets/image/login/ground2.png';
import kakaoLoginBtn from '@/assets/image/login/kakaologin.png';
import loginBtn from '@/assets/image/login/login.png';
import profileImg from '@/assets/image/login/profile.png';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

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

        {/* e-mail */}
        <input
          type="email"
          placeholder="e-mail"
          className="mb-5 h-[64px] w-full rounded-[24px] bg-white px-6 text-[15px] outline-none"
        />

        {/* name (회원가입만) */}
        {isSignup && (
          <input
            type="text"
            placeholder="name"
            className="mb-5 h-[64px] w-full rounded-[24px] bg-white px-6 text-[15px] outline-none"
          />
        )}

        {/* password */}
        <div className="relative mb-5">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="password"
            className="h-[64px] w-full rounded-[24px] bg-white px-6 text-[15px] outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-6 top-1/2 -translate-y-1/2 opacity-50"
          >
            👁
          </button>
        </div>

        {/* password confirm (회원가입만) */}
        {isSignup && (
          <div className="relative mb-5">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="password confirm"
              className="h-[64px] w-full rounded-[24px] bg-white px-6 text-[15px] outline-none"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-50">
              👁
            </span>
          </div>
        )}

        {/* 로그인 상태 유지 (로그인만) */}
        {!isSignup && (
          <label className="mb-7 flex items-center gap-3 text-[14px] text-[#555]">
            <span className="h-[20px] w-[20px] rounded-full border border-[#AAA] bg-white" />
            로그인 상태 유지
          </label>
        )}

        {/* 버튼 */}
        <img
          src={loginBtn}
          alt={isSignup ? 'sign up' : 'login'}
          className="mb-6 block w-full"
          draggable={false}
        />

        {/* divider */}
        <div className="mb-5 h-px bg-[#CFC8B8]" />

        {/* 하단 링크 */}
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

        {/* 카카오 */}
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
