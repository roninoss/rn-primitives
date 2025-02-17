import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: [
    'src/index.ts',
    'src/accordion.tsx',
    'src/accordion.web.tsx',
    'src/accordion-native/index.ts',
    'src/accordion-native/accordion-native.tsx',
    'src/accordion-native/accordion-native.web.tsx',
    'src/accordion-web/index.ts',
    'src/accordion-web/accordion-web.tsx',
    'src/accordion-web/accordion-web.web.tsx',
  ],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: ['react', './accordion', './accordion-native', './accordion-web'],
  dts: true,
  ...options,
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
}));
