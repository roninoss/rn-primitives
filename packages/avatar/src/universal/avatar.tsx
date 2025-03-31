import { Fallback as FallbackNative, Image as ImageNative, Root as RootNative } from '../native';
import type { FallbackProps, ImageProps, RootProps } from './types';

function Root({ web: _web, native, ...props }: RootProps) {
  return <RootNative {...props} {...native} />;
}

function Image({ web: _web, native, ...props }: ImageProps) {
  return <ImageNative {...props} {...native} />;
}

function Fallback({ web: _web, native, ...props }: FallbackProps) {
  return <FallbackNative {...props} {...native} />;
}

export { Fallback, Image, Root };
