import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    svgr(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest', // ← 추가
      srcDir: 'src', // ← 추가
      filename: 'sw.ts', // ← 추가
      injectRegister: 'script-defer',
      devOptions: {
        enabled: mode === 'development',
        type: 'module',
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Farm-us', // 전체 이름 변경
        short_name: '팜어스', //  앱 아이콘 아래에 뜰 이름
        description: '내 손안의 스마트 농장 관리 서비스, 팜어스', // 설명 변경
        lang: 'ko-KR',
        start_url: '/',
        scope: '/',
        display: 'standalone', // 진짜 앱처럼 주소창 없이 실행됨
        theme_color: '#E6E0D3', // 형이 쓰는 메인 배경색으로 변경!
        background_color: '#E6E0D3', // 앱 실행 시 스플래시 화면 배경색
        icons: [
          {
            src: 'IconPwa1.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'IconPwa2.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'IconPwa2.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}));
