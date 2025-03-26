import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: [
    'src/index.ts',
    'src/universal/index.ts',
    'src/universal/component.tsx',
    'src/universal/component.web.tsx',
    'src/native/index.ts',
    'src/native/component-native.tsx',
    'src/native/component-native.native.tsx',
    'src/web/index.ts',
    'src/web/component-web.tsx',
    'src/web/component-web.web.tsx',
  ],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: [
    'react',
    './universal',
    './component',
    '../native',
    './component-native',
    '../web',
    './component-web',
  ],
  dts: true,
  ...options,
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
}));
