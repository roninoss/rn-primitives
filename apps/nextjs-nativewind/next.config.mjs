/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    transpilePackages: [
      "react-native",
      "react-native-web",
      "expo",
      "nativewind",
      "react-native-css-interop",
      "@rn-primitives/slot",
      "@rn-primitives/types",
      "@rn-primitives/avatar",
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
          "react-native$": "react-native-web",
          // Alias internal react-native modules to react-native-web
          "react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$":
            "react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter",
          "react-native/Libraries/vendor/emitter/EventEmitter$":
            "react-native-web/dist/vendor/react-native/emitter/EventEmitter",
          "react-native/Libraries/EventEmitter/NativeEventEmitter$":
            "react-native-web/dist/vendor/react-native/NativeEventEmitter",
        };
  
        config.resolve.extensions = [
          ".web.js",
          ".web.jsx",
          ".web.ts",
          ".web.tsx",
          ...(config.resolve?.extensions ?? []),
        ];
  
        if (!config.plugins) {
          config.plugins = [];
        }
  
        // Execute the user-defined webpack config.
        if (typeof nextConfig.webpack === "function") {
          return nextConfig.webpack(config, options);
        }
  
        return config;
      },
    };
  }
  