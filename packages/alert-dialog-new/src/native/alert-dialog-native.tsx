import * as React from 'react';
import { RootContextReturnType } from '../utils/contexts';
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

function Root(_props: RootProps) {
  return null;
}

Root.displayName = 'AlertDialogRootNative';

const Trigger = React.forwardRef<TriggerRef, TriggerProps>(() => {
  return null;
});

Trigger.displayName = 'AlertDialogTriggerNative';

function Portal(_props: PortalProps) {
  return null;
}

const Overlay = React.forwardRef<OverlayRef, OverlayProps>(() => {
  return null;
});

Overlay.displayName = 'AlertDialogOverlayNative';

const Content = React.forwardRef<ContentRef, ContentProps>(() => {
  return null;
});

Content.displayName = 'AlertDialogContentNative';

const Cancel = React.forwardRef<CancelRef, CancelProps>(() => {
  return null;
});

Cancel.displayName = 'AlertDialogCloseNative';

const Action = React.forwardRef<ActionRef, ActionProps>(() => {
  return null;
});

Action.displayName = 'AlertDialogActionNative';

const Title = React.forwardRef<TitleRef, TitleProps>(() => {
  return null;
});

Title.displayName = 'AlertDialogTitleNative';

const Description = React.forwardRef<DescriptionRef, DescriptionProps>(() => {
  return null;
});

Description.displayName = 'AlertDialogDescriptionNative';

const useRootContext = () => {
  throw new Error(
    'Cannot access the native useRootContext on the web. Please import from `@rn-primitives/alert-dialog` or `@rn-primitives/alert-dialog/web`'
  );
  return {} as RootContextReturnType;
};

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
