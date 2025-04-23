import { Root as RootNative, RootProps as RootPropsNative } from '../native';
import type { RootProps } from './types';

function Root({ web: _web, native, ref, disabled, ...props }: RootProps) {
  return (
    <RootNative ref={ref as RootPropsNative['ref']} {...props} {...native} disabled={disabled} />
  );
}

export { Root };
