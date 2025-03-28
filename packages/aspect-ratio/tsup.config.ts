import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: [
    'src/index.ts',
    'src/universal/index.ts',
    'src/universal/aspect-ratio.tsx',
    'src/universal/aspect-ratio.web.tsx',
    'src/native/index.ts',
    'src/native/aspect-ratio-native.tsx',
    'src/native/aspect-ratio-native.native.tsx',
    'src/web/index.ts',
    'src/web/aspect-ratio-web.tsx',
    'src/web/aspect-ratio-web.web.tsx',
  ],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: [
    'react',
    './universal',
    './aspect-ratio',
    '../native',
    './aspect-ratio-native',
    '../web',
    './aspect-ratio-web',
  ],
  dts: true,
  ...options,
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
}));
