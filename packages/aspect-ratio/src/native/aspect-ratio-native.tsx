import type { RootProps } from './types';

function Root(props: RootProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/aspect-ratio/native is only supported on native.');
  }
  return null;
}

export { Root };
