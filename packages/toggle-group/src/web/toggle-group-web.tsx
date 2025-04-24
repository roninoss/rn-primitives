import type { RootProps, ItemProps } from './types';
import type { RootContextReturnType, ItemContextReturnType } from '../utils/contexts';

const Root = (props: RootProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/toggle-group/web is only supported on web.');
  }
  return null;
};

const Item = (props: ItemProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Item` from @rn-primitives/toggle-group/web is only supported on web.');
  }
  return null;
};

const useRootContext = () => {
  throw new Error(
    'Cannot access the web useRootContext on a native platform. Please import from `@rn-primitives/toggle-group` or `@rn-primitives/toggle-group/native`'
  );
  return {} as RootContextReturnType;
};

const useItemContext = () => {
  throw new Error(
    'Cannot access the web useItemContext on a native platform. Please import from `@rn-primitives/toggle-group` or `@rn-primitives/toggle-group/native`'
  );
  return {} as ItemContextReturnType;
};

export { Item, Root, useItemContext, useRootContext };
