import * as React from 'react';
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
} from '../types/native';
import type { ItemContextReturnType, RootContextReturnType } from '../utils/contexts';

const Root = React.forwardRef<RootRef, RootProps>(() => {
  return null;
});

Root.displayName = 'AccordionRootNative';

const Item = React.forwardRef<ItemRef, ItemProps>(() => {
  return null;
});

Item.displayName = 'AccordionItemNative';

const Header = React.forwardRef<HeaderRef, HeaderProps>(() => {
  return null;
});

Header.displayName = 'AccordionHeaderNative';

const Trigger = React.forwardRef<TriggerRef, TriggerProps>(() => {
  return null;
});

Trigger.displayName = 'AccordionTriggerNative';

const Content = React.forwardRef<ContentRef, ContentProps>(() => {
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
  return {} as ItemContextReturnType<{ nativeID: string }>;
};

export { Content, Header, Item, Root, Trigger, useItemContext, useRootContext };
