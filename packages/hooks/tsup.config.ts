import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: [
    'src/index.ts',
    'src/use-augmented-ref.tsx',
    'src/use-controllable-state.tsx',
    'src/use-isomorphic-layout-effect.tsx',
    'src/use-isomorphic-layout-effect.web.tsx',
    'src/use-relative-position.tsx',
    'src/use-relative-position.web.tsx',
  ],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: ['react', './use-relative-position', './use-isomorphic-layout-effect'],
  dts: true,
  ...options,
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
}));
