import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: [
    'src/index.ts',
    'src/universal/index.ts',
    'src/universal/separator.tsx',
    'src/universal/separator.web.tsx',
    'src/native/index.ts',
    'src/native/separator-native.tsx',
    'src/native/separator-native.native.tsx',
    'src/web/index.ts',
    'src/web/separator-web.tsx',
    'src/web/separator-web.web.tsx',
  ],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: [
    'react',
    './universal',
    './separator',
    '../native',
    './separator-native',
    '../web',
    './separator-web',
  ],
  dts: true,
  ...options,
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
}));
