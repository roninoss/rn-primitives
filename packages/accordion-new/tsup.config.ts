import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: [
    'src/index.ts',
    'src/universal/index.ts',
    'src/universal/accordion.tsx',
    'src/universal/accordion.web.tsx',
    'src/native/index.ts',
    'src/native/accordion-native.tsx',
    'src/native/accordion-native.web.tsx',
    'src/web/index.ts',
    'src/web/accordion-web.tsx',
    'src/web/accordion-web.web.tsx',
  ],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: [
    'react',
    './universal',
    './accordion',
    '../native',
    './accordion-native',
    '../web',
    './accordion-web',
  ],
  dts: true,
  ...options,
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
}));
