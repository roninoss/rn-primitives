import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: [
    'src/index.ts',
    'src/universal/index.ts',
    'src/universal/dialog.tsx',
    'src/universal/dialog.web.tsx',
    'src/native/index.ts',
    'src/native/dialog-native.tsx',
    'src/native/dialog-native.native.tsx',
    'src/web/index.ts',
    'src/web/dialog-web.tsx',
    'src/web/dialog-web.web.tsx',
  ],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: [
    'react',
    './universal',
    './dialog',
    '../native',
    './dialog-native',
    '../web',
    './dialog-web',
  ],
  dts: true,
  ...options,
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
}));
