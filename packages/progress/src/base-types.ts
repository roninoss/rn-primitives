import type { RootProps as RootPropsWeb } from './web/types';

type BaseRootProps = Pick<RootPropsWeb, 'value' | 'max' | 'getValueLabel'>;

type BaseIndicatorProps = {};

export type { BaseIndicatorProps, BaseRootProps };
