// vite.config.ts
import { defineConfig } from "file:///D:/Home/Github/Javascript/MedEase/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Home/Github/Javascript/MedEase/node_modules/@vitejs/plugin-react/dist/index.mjs";
import eslint from "file:///D:/Home/Github/Javascript/MedEase/node_modules/vite-plugin-eslint/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react(), eslint()],
  server: {
    port: 3e3
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setup.ts"
  }
});
export {
  vite_config_default as default
};

