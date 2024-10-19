import type { SlottablePressableProps, SlottableTextProps } from '@rn-primitives/types';
import type { ViewStyle } from 'react-native';

type LabelRootProps = Omit<SlottablePressableProps, 'children' | 'hitSlop' | 'style'> & {
  children: React.ReactNode;
  style?: ViewStyle;
};

type LabelTextProps = SlottableTextProps & {
  /**
   * Equivalent to `id` so that the same value can be passed as `aria-labelledby` to the input element.
   */
  nativeID?: string;
  /**
   * WEB ONLY
   */
  htmlFor?: string;
};

export type { LabelRootProps, LabelTextProps };
