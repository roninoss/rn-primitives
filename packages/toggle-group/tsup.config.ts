import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: ['src/index.ts', 'src/toggle-group.tsx', 'src/toggle-group.web.tsx'],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: ['react', './toggle-group'],
  dts: true,
  ...options,
}));
