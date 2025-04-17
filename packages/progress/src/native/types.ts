import type { ViewProps } from '@rn-primitives/core/dist/native';
import type { Prettify } from '@rn-primitives/types';
import type { BaseRootProps, BaseIndicatorProps } from '../base-types';

type RootProps = Prettify<ViewProps & BaseRootProps>;
type RootPropsNativeOnly = ViewProps;

type IndicatorProps = Prettify<ViewProps & BaseIndicatorProps>;
type IndicatorPropsNativeOnly = ViewProps;

export type { RootProps, RootPropsNativeOnly, IndicatorProps, IndicatorPropsNativeOnly };
