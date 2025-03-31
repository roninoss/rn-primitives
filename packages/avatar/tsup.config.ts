import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: [
    'src/index.ts',
    'src/universal/index.ts',
    'src/universal/avatar.tsx',
    'src/universal/avatar.web.tsx',
    'src/native/index.ts',
    'src/native/avatar-native.tsx',
    'src/native/avatar-native.native.tsx',
    'src/web/index.ts',
    'src/web/avatar-web.tsx',
    'src/web/avatar-web.web.tsx',
  ],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: [
    'react',
    './universal',
    './avatar',
    '../native',
    './avatar-native',
    '../web',
    './avatar-web',
  ],
  dts: true,
  ...options,
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
}));
