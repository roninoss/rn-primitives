import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: [
    'src/index.ts',
    'src/universal/index.ts',
    'src/universal/toggle-group.tsx',
    'src/universal/toggle-group.web.tsx',
    'src/native/index.ts',
    'src/native/toggle-group-native.tsx',
    'src/native/toggle-group-native.native.tsx',
    'src/web/index.ts',
    'src/web/toggle-group-web.tsx',
    'src/web/toggle-group-web.web.tsx',
  ],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: [
    'react',
    './universal',
    './toggle-group',
    '../native',
    './toggle-group-native',
    '../web',
    './toggle-group-web',
  ],
  dts: true,
  ...options,
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
}));
