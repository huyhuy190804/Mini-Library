import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate", // Tự động cập nhật khi có nội dung mới
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Library Manager System",
        short_name: "LibraryManager",
        description: "A mini library management system built with MERN stack",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-logo.png", // Bạn phải chuẩn bị icon này trong thư mục public
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-logo.png", // Bạn phải chuẩn bị icon này trong thư mục public
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
});
