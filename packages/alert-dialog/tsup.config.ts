import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: [
    'src/index.ts',
    'src/universal/index.ts',
    'src/universal/alert-dialog.tsx',
    'src/universal/alert-dialog.web.tsx',
    'src/native/index.ts',
    'src/native/alert-dialog-native.tsx',
    'src/native/alert-dialog-native.native.tsx',
    'src/web/index.ts',
    'src/web/alert-dialog-web.tsx',
    'src/web/alert-dialog-web.web.tsx',
  ],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: [
    'react',
    './universal',
    './alert-dialog',
    '../native',
    './alert-dialog-native',
    '../web',
    './alert-dialog-web',
  ],
  dts: true,
  ...options,
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
}));
