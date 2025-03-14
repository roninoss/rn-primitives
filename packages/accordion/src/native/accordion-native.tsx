import * as React from 'react';
import type { ItemContextReturnType, RootContextReturnType } from '../utils/contexts';
import type {
  ContentProps,
  ContentRef,
  HeaderProps,
  HeaderRef,
  ItemProps,
  ItemRef,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
} from './types';

const Root = React.forwardRef<RootRef, RootProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root`, from @rn-primitives/accordion/native is only supported on web.');
  }
  return null;
});

Root.displayName = 'AccordionRootNative';

const Item = React.forwardRef<ItemRef, ItemProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Item`, from @rn-primitives/accordion/native is only supported on web.');
  }
  return null;
});

Item.displayName = 'AccordionItemNative';

const Header = React.forwardRef<HeaderRef, HeaderProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Header`, from @rn-primitives/accordion/native is only supported on web.');
  }
  return null;
});

Header.displayName = 'AccordionHeaderNative';

const Trigger = React.forwardRef<TriggerRef, TriggerProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Trigger`, from @rn-primitives/accordion/native is only supported on web.');
  }
  return null;
});

Trigger.displayName = 'AccordionTriggerNative';

const Content = React.forwardRef<ContentRef, ContentProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Content`, from @rn-primitives/accordion/native is only supported on web.');
  }
  return null;
});

Content.displayName = 'AccordionContentNative';

const useRootContext = () => {
  throw new Error(
    'Cannot access the native useRootContext on the web. Please import from `@rn-primitives/accordion` or `@rn-primitives/accordion/web`'
  );
  return {} as RootContextReturnType;
};

const useItemContext = () => {
  throw new Error(
    'Cannot access the native useItemContext on the web. Please import from `@rn-primitives/accordion` or `@rn-primitives/accordion/web`'
  );
  return {} as ItemContextReturnType;
};

export { Content, Header, Item, Root, Trigger, useItemContext, useRootContext };
