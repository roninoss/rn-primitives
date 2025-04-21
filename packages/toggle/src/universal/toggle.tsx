import { Root as RootNative } from '../native';
import type { RootProps } from './types';

function Root({ web: _web, native, disabled, ...props }: RootProps) {
  return <RootNative {...props} {...native} disabled={disabled} />;
}

export { Root };
