/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    'react-native',
    'react-native-web',
    'expo',
    'nativewind',
    'react-native-css-interop',
    'react-native-reanimated',
    '@rn-primitives/accordion',
    '@rn-primitives/accordion-new',
    '@rn-primitives/alert-dialog',
    '@rn-primitives/aspect-ratio',
    '@rn-primitives/avatar',
    '@rn-primitives/checkbox',
    '@rn-primitives/collapsible',
    '@rn-primitives/context-menu',
    '@rn-primitives/dialog',
    '@rn-primitives/dropdown-menu',
    '@rn-primitives/hover-card',
    '@rn-primitives/label',
    '@rn-primitives/menubar',
    '@rn-primitives/navigation-menu',
    '@rn-primitives/popover',
    '@rn-primitives/portal',
    '@rn-primitives/progress',
    '@rn-primitives/radio-group',
    '@rn-primitives/select',
    '@rn-primitives/separator',
    '@rn-primitives/slider',
    '@rn-primitives/slot',
    '@rn-primitives/switch',
    '@rn-primitives/table',
    '@rn-primitives/tabs',
    '@rn-primitives/toast',
    '@rn-primitives/toggle',
    '@rn-primitives/toggle-group',
    '@rn-primitives/toolbar',
    '@rn-primitives/tooltip',
    '@rn-primitives/types',
  ],

  experimental: {
    forceSwcTransforms: true,
  },
};

export default withExpo(nextConfig);

// https://github.com/expo/expo-webpack-integrations/blob/main/packages/next-adapter/src/index.ts
function withExpo(nextConfig) {
  return {
    ...nextConfig,
    webpack(config, options) {
      // Mix in aliases
      if (!config.resolve) {
        config.resolve = {};
      }

      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        // Alias direct react-native imports to react-native-web
        'react-native$': 'react-native-web',
        // Alias internal react-native modules to react-native-web
        'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$':
          'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
        'react-native/Libraries/vendor/emitter/EventEmitter$':
          'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
        'react-native/Libraries/EventEmitter/NativeEventEmitter$':
          'react-native-web/dist/vendor/react-native/NativeEventEmitter',
      };

      config.resolve.extensions = [
        '.web.js',
        '.web.jsx',
        '.web.ts',
        '.web.tsx',
        ...(config.resolve?.extensions ?? []),
      ];

      if (!config.plugins) {
        config.plugins = [];
      }

      // Expose __DEV__ from Metro.
      config.plugins.push(
        new options.webpack.DefinePlugin({
          __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
        })
      );

      // Execute the user-defined webpack config.
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  };
}
