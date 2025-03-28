import { Root as RootNative } from '../native';
import type { RootProps } from './types';

function Root({ web: _web, native, ...props }: RootProps) {
  return <RootNative {...props} {...native} />;
}

export { Root };
