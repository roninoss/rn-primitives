import type { Separator } from '@radix-ui/react-separator';

const Root = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/separator/web is only supported on web.');
  }
  return null;
}) as unknown as typeof Separator;

export { Root };
