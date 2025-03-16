import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@radix-ui/react-alert-dialog';
import { useControllableState } from '@rn-primitives/hooks';
import * as React from 'react';
import { RootContext, useRootContext } from '../utils/contexts';
import type {
  ActionProps,
  ActionRef,
  CancelProps,
  CancelRef,
  ContentProps,
  ContentRef,
  DescriptionProps,
  DescriptionRef,
  OverlayProps,
  OverlayRef,
  PortalProps,
  RootProps,
  TitleProps,
  TitleRef,
  TriggerProps,
  TriggerRef,
} from './types';

function Root({
  children,
  defaultOpen,
  onOpenChange: onOpenChangeProp,
  open: openProp,
}: RootProps) {
  const [open = false, onOpenChange] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChangeProp,
  });

  return (
    <RootContext.Provider value={{ open, onOpenChange }}>
      <AlertDialog
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        children={children}
      />
    </RootContext.Provider>
  );
}

const Trigger = React.forwardRef<TriggerRef, TriggerProps>((props, ref) => {
  return <AlertDialogTrigger ref={ref} {...props} />;
});

Trigger.displayName = 'AlertDialogTriggerWeb';

const Content = React.forwardRef<ContentRef, ContentProps>((props, ref) => {
  return <AlertDialogContent ref={ref} {...props} />;
});

Content.displayName = 'AlertDialogContentWeb';

const Action = React.forwardRef<ActionRef, ActionProps>((props, ref) => {
  return <AlertDialogAction ref={ref} {...props} />;
});

Action.displayName = 'AlertDialogActionWeb';

const Cancel = React.forwardRef<CancelRef, CancelProps>((props, ref) => {
  return <AlertDialogCancel ref={ref} {...props} />;
});

Cancel.displayName = 'AlertDialogCancelWeb';

const Description = React.forwardRef<DescriptionRef, DescriptionProps>((props, ref) => {
  return <AlertDialogDescription ref={ref} {...props} />;
});

Description.displayName = 'AlertDialogDescriptionWeb';

const Overlay = React.forwardRef<OverlayRef, OverlayProps>((props, ref) => {
  return <AlertDialogOverlay ref={ref} {...props} />;
});

Overlay.displayName = 'AlertDialogOverlayWeb';

function Portal(props: PortalProps) {
  return <AlertDialogPortal {...props} />;
}

const Title = React.forwardRef<TitleRef, TitleProps>((props, ref) => {
  return <AlertDialogTitle ref={ref} {...props} />;
});

Title.displayName = 'AlertDialogTitleWeb';

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
