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
      apply: 'serve',
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
    {
      name: 'treat-mjs-js-as-jsx-build',
      apply: 'build', // Only runs in build mode
      enforce: 'pre', // Runs before other plugins
      async load(id) {
        // Ignore virtual modules
        if (id.startsWith('\x00')) {
          return null;
        }

        if (id.endsWith('.mjs') || id.endsWith('.js')) {
          const fs = await import('fs/promises');
          try {
            const code = await fs.readFile(id, 'utf8');
            const result = await esbuild.transform(code, {
              loader: 'jsx',
              jsx: 'automatic',
            });
            return {
              code: result.code,
              map: result.map,
            };
          } catch (err) {
            console.error(`Error processing ${id}:`, err);
            return null;
          }
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
