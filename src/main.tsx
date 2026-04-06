import '@/styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';

import App from '@/App.tsx';

// ✨ 빌드 환경(운영 서버)에서만 서비스 워커를 등록하도록 설정
if (import.meta.env.PROD) {
  registerSW({ immediate: true });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
