import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import { compression } from 'vite-plugin-compression2';
import million from 'million/compiler';
// import vitePerformancePlugin from './vite-performance-plugin';
// Add to vite.config.js
import imagemin from 'vite-plugin-imagemin';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    imagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 65,
      },
      pngquant: {
        quality: [0.65, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),

    // vitePerformancePlugin(),
    million.vite({ 
      auto: true,
      mute: true,
      threshold: 0.05, // Lower threshold for more aggressive optimization
    }),
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { 
            runtime: 'automatic',
            importSource: 'react',
            throwIfNamespace: true,
          }]
        ]
      },
      fastRefresh: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Amr Muhamed Portfolio',
        short_name: 'Portfolio',
        description: 'Full Stack Developer Portfolio',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globDirectory: 'dist',
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-files',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ],
        skipWaiting: true,
        clientsClaim: true
      }
    }),
    {
      name: 'chat-api',
      configureServer(server) {
        server.middlewares.use('/api/chat', async (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405;
            res.end(JSON.stringify({ error: 'Method not allowed' }));
            return;
          }

          // Parse request body
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });

          req.on('end', async () => {
            try {
              const data = JSON.parse(body);
              const { message } = data;

              if (!message) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Message is required' }));
                return;
              }

              const { handleChatRequest } = await import('./src/api/chat.js');
              const result = await handleChatRequest(message);

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result));
            } catch (error) {
              console.error('Chat handler error:', error);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Internal server error' }));
            }
          });
        });
      },
    },
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
      deleteOriginalAssets: false,
      threshold: 512, // Only compress files larger than 512 bytes
    }),
    process.env.ANALYZE && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap', // Use treemap for better visualization
    }),
  ].filter(Boolean),
  
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: false, // Bundle all CSS into a single file
    sourcemap: process.env.NODE_ENV === 'development',
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-animation': ['framer-motion'],
          'vendor-utils': ['react-use', 'web-vitals'],
        },
        // Optimize chunk size
        chunkFileNames: (chunkInfo) => {
          const id = chunkInfo.facadeModuleId || chunkInfo.moduleIds[0];
          if (id && id.includes('node_modules')) {
            const name = id.toString().split('node_modules/')[1].split('/')[0].replace('@', '');
            return `assets/vendor-${name}-[hash].js`;
          }
          return 'assets/[name]-[hash].js';
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: true,
        pure_funcs: process.env.NODE_ENV === 'production' ? ['console.log', 'console.info', 'console.debug', 'console.trace'] : [],
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    }
  },

  esbuild: {
    jsxInject: `import React from 'react'`,
    drop: ['console', 'debugger'],
    pure: ['console.log', 'console.info', 'console.debug', 'console.trace'],
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'react-use',
      'web-vitals',
      'react-intersection-observer'
    ],
    exclude: ['@vercel/analytics'],
    esbuildOptions: {
      target: 'esnext',
      supported: {
        'top-level-await': true
      },
    }
  },

  server: {
    open: true,
    host: true,
    cors: true,
    hmr: {
      overlay: true,
    },
    headers: {
      'Cache-Control': 'public, max-age=31536000',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    }
  },
});
