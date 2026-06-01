/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_KAKAO_JS_KEY: string;
    readonly VITE_KAKAO_REDIRECT_URI: string;
}

interface KakaoAuth {
    authorize: (settings: {
        redirectUri: string;
        scope?: string;
        state?: string;
    }) => void;
}

interface KakaoSDK {
    init: (appKey: string) => void;
    isInitialized: () => boolean;
    Auth: KakaoAuth;
}

interface Window {
    Kakao?: KakaoSDK;
}