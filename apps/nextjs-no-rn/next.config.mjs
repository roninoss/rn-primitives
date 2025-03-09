/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    // 'react-native',
    // 'react-native-web',
    // 'expo',
    // 'nativewind',
    // 'react-native-css-interop',
    // 'react-native-reanimated',
    // '@rn-primitives/accordion',
    // '@rn-primitives/alert-dialog',
    // '@rn-primitives/aspect-ratio',
    // '@rn-primitives/avatar',
    // '@rn-primitives/checkbox',
    // '@rn-primitives/collapsible',
    // '@rn-primitives/context-menu',
    // '@rn-primitives/dialog',
    // '@rn-primitives/dropdown-menu',
    // '@rn-primitives/hover-card',
    // '@rn-primitives/label',
    // '@rn-primitives/menubar',
    // '@rn-primitives/navigation-menu',
    // '@rn-primitives/popover',
    // '@rn-primitives/portal',
    // '@rn-primitives/progress',
    // '@rn-primitives/radio-group',
    // '@rn-primitives/select',
    // '@rn-primitives/separator',
    // '@rn-primitives/slider',
    // '@rn-primitives/slot',
    // '@rn-primitives/switch',
    // '@rn-primitives/table',
    // '@rn-primitives/tabs',
    // '@rn-primitives/toast',
    // '@rn-primitives/toggle',
    // '@rn-primitives/toggle-group',
    // '@rn-primitives/toolbar',
    // '@rn-primitives/tooltip',
    // '@rn-primitives/types',
    '@rn-primitives/core',
  ],

  experimental: {
    forceSwcTransforms: true,
  },
};

export default withRNPrimitives(nextConfig);

// https://github.com/expo/expo-webpack-integrations/blob/main/packages/next-adapter/src/index.ts
function withRNPrimitives(nextConfig) {
  return {
    ...nextConfig,
    webpack(config) {
      config.resolve.extensions = [
        '.web.js',
        '.web.jsx',
        '.web.ts',
        '.web.tsx',
        ...(config.resolve?.extensions ?? []),
      ];

      return config;
    },
  };
}
