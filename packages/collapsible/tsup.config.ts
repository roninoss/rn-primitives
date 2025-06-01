import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: [
    'src/index.ts',
    'src/universal/index.ts',
    'src/universal/collapsible.tsx',
    'src/universal/collapsible.web.tsx',
    'src/native/index.ts',
    'src/native/collapsible-native.tsx',
    'src/native/collapsible-native.native.tsx',
    'src/web/index.ts',
    'src/web/collapsible-web.tsx',
    'src/web/collapsible-web.web.tsx',
  ],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: [
    'react',
    './universal',
    './collapsible',
    '../native',
    './collapsible-native',
    '../web',
    './collapsible-web',
  ],
  dts: true,
  ...options,
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
}));
