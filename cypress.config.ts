import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false,
    specPattern: 'tests/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
  },
});
