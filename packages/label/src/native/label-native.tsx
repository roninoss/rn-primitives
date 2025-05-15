import type { RootProps, TextProps } from './types';

function Root(props: RootProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/label/native is only supported on native.');
  }
  return null;
}

function Text(props: TextProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Text` from @rn-primitives/label/native is only supported on native.');
  }
  return null;
}

export { Root, Text };
