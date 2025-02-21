import * as React from 'react';
import {
  Content as ContentNative,
  Header as HeaderNative,
  Item as ItemNative,
  Root as RootNative,
  Trigger as TriggerNative,
  TriggerRef as TriggerNativeRef,
  useItemContext,
  useRootContext,
} from '../native';
import type {
  ContentProps,
  HeaderProps,
  ItemProps,
  RootProps,
  TriggerProps,
  TriggerRef,
} from './types';

function Root({ web: _web, native, ...props }: RootProps) {
  return <RootNative {...props} {...native} />;
}

function Content({ web: _web, native, ...props }: ContentProps) {
  return <ContentNative {...props} {...native} />;
}

function Header({ web: _web, native, ...props }: HeaderProps) {
  return <HeaderNative {...props} {...native} />;
}

function Item({ web: _web, native, ...props }: ItemProps) {
  return <ItemNative {...props} {...native} />;
}

const Trigger = React.forwardRef<TriggerRef, TriggerProps>(
  ({ web: _web, native, ...props }, ref) => {
    return (
      <TriggerNative ref={ref as React.ForwardedRef<TriggerNativeRef>} {...props} {...native} />
    );
  }
);

export { Content, Header, Item, Root, Trigger, useItemContext, useRootContext };
