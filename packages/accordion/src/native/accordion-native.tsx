import type { ItemContextReturnType, RootContextReturnType } from '../utils/contexts';
import type { ContentProps, HeaderProps, ItemProps, RootProps, TriggerProps } from './types';

function Root(props: RootProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/accordion/native is only supported on native.');
  }
  return null;
}

function Item(props: ItemProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Item` from @rn-primitives/accordion/native is only supported on native.');
  }
  return null;
}

function Header(props: HeaderProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Header` from @rn-primitives/accordion/native is only supported on native.');
  }
  return null;
}

function Trigger(props: TriggerProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Trigger` from @rn-primitives/accordion/native is only supported on native.');
  }
  return null;
}

function Content(props: ContentProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Content` from @rn-primitives/accordion/native is only supported on native.');
  }
  return null;
}

const useRootContext = () => {
  throw new Error(
    'Cannot access the native useRootContext on the web. Please import from `@rn-primitives/accordion` or `@rn-primitives/accordion/native`'
  );
  return {} as RootContextReturnType;
};

const useItemContext = () => {
  throw new Error(
    'Cannot access the native useItemContext on the web. Please import from `@rn-primitives/accordion` or `@rn-primitives/accordion/native`'
  );
  return {} as ItemContextReturnType;
};

export { Content, Header, Item, Root, Trigger, useItemContext, useRootContext };
