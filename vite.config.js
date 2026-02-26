import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  server: {
    hmr: {
      clientPort: 5173,
      protocol: 'ws',
      host: 'localhost',
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'src/assets/icons/fox.png'],
      manifest: {
        name: 'Han Portfolio',
        short_name: 'Han',
        description: 'Portfolio of Han',
        theme_color: '#222222',
        background_color: '#F8F8F8',
        display: 'standalone',
        start_url: '.',
        icons: [
          {
            src: 'src/assets/icons/fox.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'src/assets/icons/fox.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'external-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
  ],
})
