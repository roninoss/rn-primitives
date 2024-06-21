import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: ['src/index.ts', 'src/table.tsx'],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: ['react', './table'],
  dts: true,
  ...options,
}));
