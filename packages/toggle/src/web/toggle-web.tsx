import type { RootProps } from './types';

function Root(props: RootProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/toggle/web is only supported on web.');
  }
  return null;
}

export { Root };
