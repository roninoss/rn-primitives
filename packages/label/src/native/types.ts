import type { PressableProps, TextProps as RNPTextProps } from '@rn-primitives/core/dist/native';
import type { Prettify } from '@rn-primitives/types';
import type { BaseRootProps, BaseTextProps } from '../base-types';

type RootProps = Prettify<PressableProps & BaseRootProps>;
type RootPropsNativeOnly = PressableProps;

type TextProps = Prettify<RNPTextProps & BaseTextProps>;
type TextPropsNativeOnly = RNPTextProps;

export type { RootProps, RootPropsNativeOnly, TextProps, TextPropsNativeOnly };
