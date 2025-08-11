import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My App",
        short_name: "MyApp",
        start_url: ".",
        display: "standalone",
        background_color: "#FFEBB9",
        theme_color: "#FFEBB9",
        icons: [
          {
            src: "/appLogo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/appLogo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
