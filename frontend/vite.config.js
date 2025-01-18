import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext", // Optimize for modern browsers
    minify: "terser", // Use Terser for advanced minification
    cssCodeSplit: true, // Split CSS into separate files for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // Separate vendor libraries
        },
      },
    },
  },
  esbuild: {
    jsx: "automatic", // Use React 17+ JSX runtime
  },
});