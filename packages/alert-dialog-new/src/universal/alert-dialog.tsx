import * as React from 'react';
import {
  Action as ActionNative,
  Cancel as CancelNative,
  type CancelRef as CancelNativeRef,
  Content as ContentNative,
  Description as DescriptionNative,
  Overlay as OverlayNative,
  Portal as PortalNative,
  Root as RootNative,
  Title as TitleNative,
  Trigger as TriggerNative,
  type TriggerRef as TriggerNativeRef,
  useRootContext,
} from '../native';
import type {
  ActionProps,
  CancelProps,
  CancelRef,
  ContentProps,
  DescriptionProps,
  OverlayProps,
  PortalProps,
  RootProps,
  TitleProps,
  TriggerProps,
  TriggerRef,
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

const Trigger = React.forwardRef<TriggerRef, TriggerProps>(
  ({ web: _web, native, ...props }, ref) => {
    return (
      <TriggerNative ref={ref as React.ForwardedRef<TriggerNativeRef>} {...props} {...native} />
    );
  }
);

Trigger.displayName = 'AlertDialogTriggerUniversal';

function Action({ web: _web, native, ...props }: ActionProps) {
  return <ActionNative {...props} {...native} />;
}

const Cancel = React.forwardRef<CancelRef, CancelProps>(({ web: _web, native, ...props }, ref) => {
  return <CancelNative ref={ref as React.ForwardedRef<CancelNativeRef>} {...props} {...native} />;
});

Cancel.displayName = 'AlertDialogCancelUniversal';

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
