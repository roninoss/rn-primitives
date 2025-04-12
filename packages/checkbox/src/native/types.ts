import type { PressableProps, ViewProps } from '@rn-primitives/core/dist/native';
import type { Prettify } from '@rn-primitives/types';
import type { BaseCheckboxIndicatorProps, BaseCheckboxRootProps } from '../base-types';

type RootProps = Prettify<PressableProps & BaseCheckboxRootProps>;
type RootPropsNativeOnly = PressableProps;

type IndicatorProps = Prettify<ViewProps & BaseCheckboxIndicatorProps>;
type IndicatorPropsNativeOnly = ViewProps;

export type { IndicatorProps, IndicatorPropsNativeOnly, RootProps, RootPropsNativeOnly };
