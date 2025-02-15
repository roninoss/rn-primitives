import * as React from 'react';
import { createItemContext, createUseItemContext, useRootContext } from '../utils/contexts';
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
  return null;
});

Root.displayName = 'AccordionRootNative';

const AccordionItemContext = createItemContext<{ nativeID: string }>();
const useItemContext = createUseItemContext(AccordionItemContext);

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

export { Content, Header, Item, Root, Trigger, useItemContext, useRootContext };
