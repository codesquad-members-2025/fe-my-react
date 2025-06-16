// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  /*
   * dev 서버의 루트 디렉토리를 jsx-demo로 지정
   * 실제 테스트할 dev 환경이랑 프레임워크 코드랑 분리하는 작업.
   */

  root: path.resolve(__dirname, "jsx-demo"),

  plugins: [
    // root 의 경로안에 있는 tsconfig 가 아닌 외부 경로의 config 파일을 참조하기 위해 직접 경로 선언
    tsconfigPaths({ projects: [path.resolve(__dirname, "tsconfig.json")] }),
    react({
      // classic JSX 런타임 사용
      jsxRuntime: "classic",
      // babel.config.js의 설정을 사용
    }),
  ],
  esbuild: {
    // .jsx 파일 전용 로더

    loader: "jsx",

    include: /src\/.*\.jsx$/,

    // Classic 런타임 프래그마 지정

    jsxFactory: "MyReact.createElement",

    jsxFragment: "MyReact.Fragment",

    jsxInject: `import MyReact from '@core';`,
  },

  build: {
    // 빌드 결과물을 jsx-demo/dist에 저장
    outDir: "jsx-demo/dist",
    // 소스맵 생성
    sourcemap: true,
  },

  server: {
    //루트(jsx-demo) 밖의 src 폴더를 허용해야 브라우저가 프레임워크 코드를 불러올 수 있음
    fs: { allow: [path.resolve(__dirname, "src")] },
    port: 3000,
    // 자동으로 브라우저 열기
    open: true,
  },
});
