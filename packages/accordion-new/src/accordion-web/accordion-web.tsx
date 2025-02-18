import { Content, Header } from '@radix-ui/react-accordion';
import * as React from 'react';
import type {
  ItemProps,
  ItemRef,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
} from '../types/web';
import type { ItemContextReturnType, RootContextReturnType } from '../utils/contexts';

const Root = React.forwardRef<RootRef, RootProps>(() => {
  return null;
});

Root.displayName = 'AccordionRootWeb';

const Item = React.forwardRef<ItemRef, ItemProps>(() => {
  return null;
});

Item.displayName = 'AccordionItemWeb';

const Trigger = React.forwardRef<TriggerRef, TriggerProps>(() => {
  return null;
});

Trigger.displayName = 'AccordionTriggerWeb';

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
  return {} as ItemContextReturnType<{ nativeID: string }>;
};

export { Content, Header, Item, Root, Trigger, useItemContext, useRootContext };
