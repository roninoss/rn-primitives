import viteReact from '@vitejs/plugin-react';
import esbuild from 'esbuild';
import { defineConfig } from 'vite';

import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'treat-mjs-js-as-jsx',
      async transform(code, id) {
        if (id.endsWith('.mjs') || id.endsWith('.js')) {
          const result = await esbuild.transform(code, {
            loader: 'jsx',
            jsx: 'automatic',
          });
          return {
            code: result.code,
            map: result.map,
          };
        }
        return null;
      },
    },
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.mjs': 'jsx',
      },
    },
  },
  resolve: {
    extensions: ['.web.mjs', '.mjs', '.web.js', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
