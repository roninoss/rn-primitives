import { ItemContextReturnType } from '../utils/contexts';
import { RootContextReturnType } from '../utils/contexts';
import type { ItemProps, RootProps } from './types';

function Root(props: RootProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/toggle-group/native is only supported on native.');
  }
  return null;
}

function Item(props: ItemProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Item` from @rn-primitives/toggle-group/native is only supported on native.');
  }
  return null;
}

const useRootContext = () => {
  throw new Error(
    'Cannot access the native useRootContext on the web. Please import from `@rn-primitives/toggle-group` or `@rn-primitives/accordion/native`'
  );
  return {} as RootContextReturnType;
};

const useItemContext = () => {
  throw new Error(
    'Cannot access the native useItemContext on the web. Please import from `@rn-primitives/toggle-group` or `@rn-primitives/toggle-group/native`'
  );
  return {} as ItemContextReturnType;
};

export { Root, Item, useItemContext, useRootContext };
