import { Content, Header } from '@radix-ui/react-accordion';
import * as React from 'react';
import { createItemContext, createUseItemContext, useRootContext } from '../utils/contexts';
import type { ItemProps, ItemRef, RootProps, RootRef, TriggerProps, TriggerRef } from './types';

const Root = React.forwardRef<RootRef, RootProps>(() => {
  return null;
});

Root.displayName = 'AccordionRootWeb';

const AccordionItemContext = createItemContext();
const useItemContext = createUseItemContext(AccordionItemContext);

const Item = React.forwardRef<ItemRef, ItemProps>(() => {
  return null;
});

Item.displayName = 'AccordionItemWeb';

const Trigger = React.forwardRef<TriggerRef, TriggerProps>(() => {
  return null;
});

Trigger.displayName = 'AccordionTriggerWeb';

export { Content, Header, Item, Root, Trigger, useItemContext, useRootContext };
