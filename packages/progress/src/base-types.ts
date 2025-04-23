import type { IndicatorProps as IndicatorPropsWeb, RootProps as RootPropsWeb } from './web/types';

type BaseRootProps = Pick<RootPropsWeb, 'value' | 'max' | 'getValueLabel' | 'asChild'>;

type BaseIndicatorProps = Pick<IndicatorPropsWeb, 'asChild'>;

export type { BaseRootProps, BaseIndicatorProps };
