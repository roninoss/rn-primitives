import type { IndicatorProps, RootProps } from './types';

function Root(props: RootProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/checkbox/native is only supported on native.');
  }
  return null;
}

function Indicator(props: IndicatorProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Indicator` from @rn-primitives/checkbox/native is only supported on native.');
  }
  return null;
}

export { Root, Indicator };
