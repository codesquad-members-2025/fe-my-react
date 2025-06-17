// vitest.config.ts
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths"; // alias가 필요하다면
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "."),
  test: {
    include: ["**/*.test.ts"], // core 폴더 안의 테스트 파일 패턴
    globals: true,
    environment: "jsdom",
    // 필요하다면 setupFiles, coverage 등 추가
  },
  resolve: {
    alias: {
      "@core": path.resolve(__dirname, "src/core"),
      "@shared": path.resolve(__dirname, "src/shared"),
    },
  },
  plugins: [
    tsconfigPaths({ projects: [path.resolve(__dirname, "tsconfig.json")] }),
  ],
});
