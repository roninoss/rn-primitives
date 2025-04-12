import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: [
    'src/index.ts',
    'src/universal/index.ts',
    'src/universal/checkbox.tsx',
    'src/universal/checkbox.web.tsx',
    'src/native/index.ts',
    'src/native/checkbox-native.tsx',
    'src/native/checkbox-native.native.tsx',
    'src/web/index.ts',
    'src/web/checkbox-web.tsx',
    'src/web/checkbox-web.web.tsx',
  ],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: [
    'react',
    './universal',
    './checkbox',
    '../native',
    './checkbox-native',
    '../web',
    './checkbox-web',
  ],
  dts: true,
  ...options,
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
}));
