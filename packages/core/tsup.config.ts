import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: [
    'src/index.ts',
    'src/native/index.tsx',
    'src/native/index.native.tsx',
    'src/native/animatable/index.tsx',
    'src/web/index.tsx',
    'src/web/index.web.tsx',
    'src/universal/index.tsx',
    'src/universal/index.web.tsx',
  ],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: ['react', './native', '../native', './web', '../web', './universal', './index'],
  dts: true,
  ...options,
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
}));
