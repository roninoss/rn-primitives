import type { Toggle } from '@radix-ui/react-toggle';

const Root = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/toggle/web is only supported on web.');
  }
  return null;
}) as unknown as typeof Toggle;

export { Root };
