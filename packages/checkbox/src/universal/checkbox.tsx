import {
  Indicator as IndicatorNative,
  Root as RootNative,
  RootProps as RootPropsNative,
} from '../native';
import type { IndicatorProps, RootProps } from './types';

function Root({ web: _web, ref, native, disabled, ...props }: RootProps) {
  return (
    <RootNative ref={ref as RootPropsNative['ref']} {...props} {...native} disabled={disabled} />
  );
}

function Indicator({ web: _web, native, ...props }: IndicatorProps) {
  return <IndicatorNative {...props} {...native} />;
}

export { Indicator, Root };
