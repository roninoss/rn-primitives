import * as React from 'react';
import {
  Action as ActionNative,
  type ActionProps as ActionPropsNative,
  Cancel as CancelNative,
  type CancelProps as CancelPropsNative,
  Content as ContentNative,
  Description as DescriptionNative,
  Overlay as OverlayNative,
  Portal as PortalNative,
  Root as RootNative,
  Title as TitleNative,
  Trigger as TriggerNative,
  type TriggerProps as TriggerPropsNative,
  useRootContext,
} from '../native';
import type {
  ActionProps,
  CancelProps,
  ContentProps,
  DescriptionProps,
  OverlayProps,
  PortalProps,
  RootProps,
  TitleProps,
  TriggerProps,
} from './types';

function Root(props: RootProps) {
  return <RootNative {...props} />;
}

function Content({ web: _web, native, ...props }: ContentProps) {
  return <ContentNative {...props} {...native} />;
}

function Description({ web: _web, native, ...props }: DescriptionProps) {
  return <DescriptionNative {...props} {...native} />;
}

function Overlay({ web: _web, native, ...props }: OverlayProps) {
  return <OverlayNative {...props} {...native} />;
}

function Portal({ web: _web, native, ...props }: PortalProps) {
  return <PortalNative {...props} {...native} />;
}

function Title({ web: _web, native, ...props }: TitleProps) {
  return <TitleNative {...props} {...native} />;
}

function Trigger({ ref, web: _web, native, ...props }: TriggerProps) {
  return <TriggerNative ref={ref as TriggerPropsNative['ref']} {...props} {...native} />;
}

function Action({ ref, web: _web, native, ...props }: ActionProps) {
  return <ActionNative ref={ref as ActionPropsNative['ref']} {...props} {...native} />;
}

function Cancel({ ref, web: _web, native, ...props }: CancelProps) {
  return <CancelNative ref={ref as CancelPropsNative['ref']} {...props} {...native} />;
}

export {
  Action,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
  useRootContext,
};
