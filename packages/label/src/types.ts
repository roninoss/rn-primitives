import type {
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  TextRef,
} from '@rn-primitives/types';
import type { ViewStyle } from 'react-native';

type RootProps = Omit<SlottablePressableProps, 'children' | 'hitSlop' | 'style'> & {
  children: React.ReactNode;
  style?: ViewStyle;
};

type TextProps = SlottableTextProps & {
  /**
   * Equivalent to `id` so that the same value can be passed as `accessibilityLabelledBy` to the input element.
   */
  nativeID?: string;
  /**
   * WEB ONLY
   */
  htmlFor?: string;
};

type RootRef = PressableRef;

export type { RootProps, RootRef, TextProps, TextRef };
