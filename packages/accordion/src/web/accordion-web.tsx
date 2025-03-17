import { Content, Header } from '@radix-ui/react-accordion';
import type { ItemContextReturnType, RootContextReturnType } from '../utils/contexts';
import type { ItemProps, RootProps, TriggerProps } from './types';

function Root(props: RootProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/accordion/web is only supported on web.');
  }
  return null;
}

function Item(props: ItemProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Item` from @rn-primitives/accordion/web is only supported on web.');
  }
  return null;
}

function Trigger(props: TriggerProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Trigger` from @rn-primitives/accordion/web is only supported on web.');
  }
  return null;
}

const useRootContext = () => {
  throw new Error(
    'Cannot access the web useRootContext on a native platform. Please import from `@rn-primitives/accordion` or `@rn-primitives/accordion/native`'
  );
  return {} as RootContextReturnType;
};

const useItemContext = () => {
  throw new Error(
    'Cannot access the web useItemContext on a native platform. Please import from `@rn-primitives/accordion` or `@rn-primitives/accordion/native`'
  );
  return {} as ItemContextReturnType;
};

export { Content, Header, Item, Root, Trigger, useItemContext, useRootContext };
