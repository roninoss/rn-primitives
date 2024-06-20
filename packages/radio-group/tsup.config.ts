import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: ['src/index.ts', 'src/radio-group.tsx', 'src/radio-group.web.tsx'],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: ['react', './radio-group'],
  dts: true,
  ...options,
}));
