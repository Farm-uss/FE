import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/axios';
import LoadingSpinner from '@/component/constants/LoadingSpinner';
import { usePushNotification } from '@/hooks/usePushNotification';
import { storage } from '@/utils/storage';


export default function KakaoCallback() {
    const navigate = useNavigate();
    const { subscribe } = usePushNotification();
    const handledRef = useRef(false);

    useEffect(() => {
        if (handledRef.current) return;

        const code = new URLSearchParams(window.location.search).get('code');
        if (!code) {
            alert('카카오 인증 코드를 받지 못했습니다.');
            navigate('/login', { replace: true });
            return;
        }

        handledRef.current = true;

        const redirectUri =
            import.meta.env.VITE_KAKAO_REDIRECT_URI ||
            `${window.location.origin}/oauth/kakao`;

        (async () => {
            try {
                const res = await api.post('/auth/login/kakao', { code, redirectUri });
                const { accessToken, refreshToken, nickname, id } = res.data;

                storage.setAccessToken(accessToken);
                storage.setRefreshToken(refreshToken);
                storage.setNickname(nickname);
                storage.setId(id);

                await subscribe();
                navigate('/home', { replace: true });
            } catch (err) {
                console.error('카카오 로그인 실패:', err);
                alert('카카오 로그인에 실패했습니다.');
                navigate('/login', { replace: true });
            }
        })();
    }, [navigate, subscribe]);

    return <LoadingSpinner fullScreen />;
}
