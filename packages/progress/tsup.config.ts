import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: [
    'src/index.ts',
    'src/universal/index.ts',
    'src/universal/progress.tsx',
    'src/universal/progress.web.tsx',
    'src/native/index.ts',
    'src/native/progress-native.tsx',
    'src/native/progress-native.native.tsx',
    'src/web/index.ts',
    'src/web/progress-web.tsx',
    'src/web/progress-web.web.tsx',
  ],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: [
    'react',
    './universal',
    './progress',
    '../native',
    './progress-native',
    '../web',
    './progress-web',
  ],
  dts: true,
  ...options,
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
}));
