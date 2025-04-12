import type { Checkbox, CheckboxIndicator } from '@radix-ui/react-checkbox';

const Root = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/checkbox/web is only supported on web.');
  }
  return null;
}) as unknown as typeof Checkbox;

const Indicator = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Indicator` from @rn-primitives/checkbox/web is only supported on web.');
  }
  return null;
}) as unknown as typeof CheckboxIndicator;

export { Indicator, Root };
