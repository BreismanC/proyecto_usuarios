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
      "@components": `${path.resolve(__dirname, "./src/components/")}`,
      "@pages": `${path.resolve(__dirname, "./src/pages/")}`,
      "@routes": `${path.resolve(__dirname, "./src/routes/")}`,
      "@assets": `${path.resolve(__dirname, "./src/assets/")}`,
      "@atoms": `${path.resolve(__dirname, "./src/components/atoms/")}`,
      "@molecules": `${path.resolve(__dirname, "./src/components/molecules/")}`,
      "@organisms": `${path.resolve(__dirname, "./src/components/organisms/")}`,
      "@utils": `${path.resolve(__dirname, "./src/utils/")}`,
    },
  },
});