import type { RootProps, IndicatorProps } from './types';

function Root(props: RootProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/progress/web is only supported on web.');
  }
  return null;
}

function Indicator(props: IndicatorProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Indicator` from @rn-primitives/progress/web is only supported on web.');
  }
  return null;
}

export { Root, Indicator };
