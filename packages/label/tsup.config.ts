import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: [
    'src/index.ts',
    'src/universal/index.ts',
    'src/universal/label.tsx',
    'src/universal/label.web.tsx',
    'src/native/index.ts',
    'src/native/label-native.tsx',
    'src/native/label-native.native.tsx',
    'src/web/index.ts',
    'src/web/label-web.tsx',
    'src/web/label-web.web.tsx',
  ],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: [
    'react',
    './universal',
    './label',
    '../native',
    './label-native',
    '../web',
    './label-web',
  ],
  dts: true,
  ...options,
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
}));
