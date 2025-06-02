import * as React from 'react';
import {
  Close as CloseNative,
  type CloseProps as ClosePropsNative,
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
  CloseProps,
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

function Close({ ref, web: _web, native, ...props }: CloseProps) {
  return <CloseNative ref={ref as ClosePropsNative['ref']} {...props} {...native} />;
}

export { Close, Content, Description, Overlay, Portal, Root, Title, Trigger, useRootContext };
