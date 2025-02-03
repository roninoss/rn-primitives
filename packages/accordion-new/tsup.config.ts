import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: [
    'src/index.ts',
    'src/accordion.tsx',
    'src/accordion.web.tsx',
    'src/accordion.native.tsx', // TODO: review this - it's not supposed to be the entry file, but it's supposed to be accessible
    'src/accordion-web.tsx', // TODO: review this - it's not supposed to be the entry file, but it's supposed to be accessible
  ],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: ['react', './accordion'],
  dts: true,
  ...options,
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
}));
