import type { Platform } from 'react-native';

const PlatformImpl: Platform = {
  OS: 'web',
  isTV: false,
  isTesting: false,
  Version: 'N/A',
  constants: {
    isTesting: false,
    reactNativeVersion: {
      major: 0,
      minor: 0,
      patch: 0,
    },
  },
  select(
    specifics: Record<
      'ios' | 'android' | 'macos' | 'windows' | 'web' | 'native' | 'default',
      unknown
    >
  ) {
    return specifics.web ?? specifics.default;
  },
};

export { PlatformImpl as Platform };
