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
    '@rnr-method/accordion',
    '@rnr-method/alert-dialog',
    '@rnr-method/aspect-ratio',
    '@rnr-method/avatar',
    '@rnr-method/checkbox',
    '@rnr-method/collapsible',
    '@rnr-method/context-menu',
    '@rnr-method/dialog',
    '@rnr-method/dropdown-menu',
    '@rnr-method/hover-card',
    '@rnr-method/label',
    '@rnr-method/menubar',
    '@rnr-method/navigation-menu',
    '@rnr-method/popover',
    '@rnr-method/portal',
    '@rnr-method/progress',
    '@rnr-method/radio-group',
    '@rnr-method/select',
    '@rnr-method/separator',
    '@rnr-method/slider',
    '@rnr-method/slot',
    '@rnr-method/switch',
    '@rnr-method/table',
    '@rnr-method/tabs',
    '@rnr-method/toast',
    '@rnr-method/toggle',
    '@rnr-method/toggle-group',
    '@rnr-method/toolbar',
    '@rnr-method/tooltip',
    '@rnr-method/types',
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
