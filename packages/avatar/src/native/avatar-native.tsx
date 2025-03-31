import type { FallbackProps, ImageProps, RootProps } from './types';

function Root(props: RootProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/avatar/native is only supported on native.');
  }
  return null;
}

function Image(props: ImageProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Image` from @rn-primitives/avatar/native is only supported on native.');
  }
  return null;
}

function Fallback(props: FallbackProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Fallback` from @rn-primitives/avatar/native is only supported on native.');
  }
  return null;
}

export { Root, Image, Fallback };
