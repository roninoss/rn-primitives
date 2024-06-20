import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: ['src/index.ts', 'src/tabs.tsx', 'src/tabs.web.tsx'],
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: ['react', './tabs'],
  dts: true,
  ...options,
}));
