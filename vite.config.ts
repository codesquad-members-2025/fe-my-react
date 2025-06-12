// vite.config.ts
import { defineConfig } from "vitest/config";
import path from "path";
import { fileURLToPath } from "url";

export default defineConfig({
  test: {
    environment: "happy-dom",
  },
});
