import type { AspectRatio } from '@radix-ui/react-aspect-ratio';

const Root = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/aspect-ratio/web is only supported on web.');
  }
  return null;
}) as unknown as typeof AspectRatio;

export { Root };
