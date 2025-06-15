// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // dev 서버의 루트 디렉토리를 jsx-demo로 지정
  root: path.resolve(__dirname, "jsx-demo"),

  plugins: [
    react({
      // classic JSX 런타임 사용
      jsxRuntime: "classic",
      // babel.config.js의 설정을 사용
    }),
  ],

  resolve: {
    alias: {
      // src/core 안의 모듈을 쉽게 import
      "@my-react": path.resolve(__dirname, "src/core"),
      // jsx-demo 폴더의 모듈을 쉽게 import
      "@jsx-demo": path.resolve(__dirname, "jsx-demo"),
    },
  },

  build: {
    // 빌드 결과물을 jsx-demo/dist에 저장
    outDir: "jsx-demo/dist",
    // 소스맵 생성
    sourcemap: true,
  },

  server: {
    port: 3000,
    // 자동으로 브라우저 열기
    open: true,
  },
});
