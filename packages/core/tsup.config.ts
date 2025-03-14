import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: [
    'src/index.ts',
    'src/native/index.ts',
    'src/native/components.tsx',
    'src/native/components.native.tsx',
    'src/native/platform.ts',
    'src/native/reanimated/index.ts',
    'src/native/reanimated/reanimated.tsx',
    'src/native/reanimated/reanimated.native.tsx',
    'src/web/index.ts',
    'src/web/components.tsx',
    'src/web/components.web.tsx',
    'src/web/platform.ts',
    'src/universal/index.ts',
    'src/universal/components.tsx',
    'src/universal/components.web.tsx',
    'src/universal/platform.ts',
    'src/universal/platform.web.ts',
  ],
  clean: true,
  format: ['cjs', 'esm'],
  external: [
    'react',
    '../native',
    './reanimated',
    '../web',
    './components',
    './universal',
    './platform',
  ],
  dts: true,
  ...options,
  esbuildOptions(options) {
    options.jsx = 'preserve';
  },
}));
