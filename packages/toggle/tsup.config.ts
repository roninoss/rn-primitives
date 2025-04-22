import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: [
    'src/index.ts',
    'src/universal/index.ts',
    'src/universal/toggle.tsx',
    'src/universal/toggle.web.tsx',
    'src/native/index.ts',
    'src/native/toggle-native.tsx',
    'src/native/toggle-native.native.tsx',
    'src/web/index.ts',
    'src/web/toggle-web.tsx',
    'src/web/toggle-web.web.tsx',
  ],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: [
    'react',
    './universal',
    './toggle',
    '../native',
    './toggle-native',
    '../web',
    './toggle-web',
  ],
  dts: true,
  ...options,
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
}));
