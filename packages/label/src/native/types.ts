import type { PressableProps, TextProps as RNPTextProps } from '@rn-primitives/core/dist/native';
import type { Prettify } from '@rn-primitives/types';
import type { BaseRootProps, BaseTextProps } from '../base-types';

type RootProps = Prettify<
  Omit<PressableProps & { isAnimated: false }, 'children' | 'hitSlop' | 'style'> & BaseRootProps
>;
type RootPropsNativeOnly = Omit<
  PressableProps & { isAnimated: false },
  'children' | 'hitSlop' | 'style'
>;

type TextProps = Prettify<RNPTextProps & BaseTextProps>;
type TextPropsNativeOnly = RNPTextProps;

export type { RootProps, RootPropsNativeOnly, TextProps, TextPropsNativeOnly };
