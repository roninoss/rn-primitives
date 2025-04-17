import { Indicator as IndicatorNative, Root as RootNative } from '../native';
import type { RootProps, IndicatorProps } from './types';

function Root({ web: _web, native, ...props }: RootProps) {
  return <RootNative {...props} {...native} />;
}

function Indicator({ web: _web, native, ...props }: IndicatorProps) {
  return <IndicatorNative {...props} {...native} />;
}

export { Indicator, Root };
