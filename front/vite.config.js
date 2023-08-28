/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@atoms": `${path.resolve(__dirname, "./src/components/atoms/")}`,
      "@assets": `${path.resolve(__dirname, "./src/assets/")}`,
      "@components": `${path.resolve(__dirname, "./src/components/")}`,
      "@hooks": `${path.resolve(__dirname, "./src/hooks/")}`,
      "@molecules": `${path.resolve(__dirname, "./src/components/molecules/")}`,
      "@organisms": `${path.resolve(__dirname, "./src/components/organisms/")}`,
      "@pages": `${path.resolve(__dirname, "./src/pages/")}`,
      "@redux": `${path.resolve(__dirname, "./src/redux/")}`,
      "@routes": `${path.resolve(__dirname, "./src/routes/")}`,
      "@utilities": `${path.resolve(__dirname, "./src/utilities/")}`,
      "@security": `${path.resolve(__dirname, "./src/security/")}`,
      "@services": `${path.resolve(__dirname, "./src/services/")}`,
    },
  },
});
