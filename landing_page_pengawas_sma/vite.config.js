import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  appType: "spa",
  server: {
    open: true,
    middlewareMode: false,
    fs: { strict: true },
  },
  preview: {
    appType: "spa",
  },
  configureServer(server) {
    return () => {
      server.middlewares.use((req, _res, next) => {
        next();
      });
    };
  },
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
});
