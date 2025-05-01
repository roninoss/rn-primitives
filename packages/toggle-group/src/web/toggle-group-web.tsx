import type { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group';
import type { RootContextReturnType, ItemContextReturnType } from '../utils/contexts';

const Root = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/toggle-group/web is only supported on web.');
  }
  return null;
}) as unknown as typeof ToggleGroup;

const Item = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Item` from @rn-primitives/toggle-group/web is only supported on web.');
  }
  return null;
}) as unknown as typeof ToggleGroupItem;

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
