import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: [
    'src/index.ts',
    'src/native/index.ts',
    'src/native/components.tsx',
    'src/native/components.native.tsx',
    'src/web/index.ts',
    'src/web/components.tsx',
    'src/web/components.web.tsx',
    'src/universal/index.ts',
    'src/universal/components.tsx',
    'src/universal/components.web.tsx',
  ],
  clean: true,
  format: ['cjs', 'esm'],
  external: ['react', '../native', '../web', './components', './universal'],
  dts: true,
  ...options,
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
}));
