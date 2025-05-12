import type { ViewStyle } from 'react-native';

type BaseRootProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

type BaseTextProps = {};

export type { BaseRootProps, BaseTextProps };
