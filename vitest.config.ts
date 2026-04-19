import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "framer-motion": path.resolve(__dirname, "./src/test/mocks/framer-motion.tsx"),
      "react-pdf": path.resolve(__dirname, "./src/test/mocks/react-pdf.tsx"),
      "recharts": path.resolve(__dirname, "./src/test/mocks/recharts.tsx"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.tsx",
    css: true,
    clearMocks: true,
    restoreMocks: true,
    include: ["src/test/**/*.test.ts", "src/test/**/*.test.tsx"],
  },
});
