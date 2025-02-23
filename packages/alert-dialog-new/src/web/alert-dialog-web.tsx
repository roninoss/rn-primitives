import * as React from 'react';
import type { RootContextReturnType } from '../utils/contexts';
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

const Trigger = React.forwardRef<TriggerRef, TriggerProps>(() => {
  return null;
});

Trigger.displayName = 'AlertDialogTriggerWeb';

const Content = React.forwardRef<ContentRef, ContentProps>(() => {
  return null;
});

Content.displayName = 'AlertDialogContentWeb';

const Action = React.forwardRef<ActionRef, ActionProps>(() => {
  return null;
});

Action.displayName = 'AlertDialogActionWeb';

const Cancel = React.forwardRef<CancelRef, CancelProps>(() => {
  return null;
});

Cancel.displayName = 'AlertDialogCancelWeb';

const Description = React.forwardRef<DescriptionRef, DescriptionProps>(() => {
  return null;
});

Description.displayName = 'AlertDialogDescriptionWeb';

const Overlay = React.forwardRef<OverlayRef, OverlayProps>(() => {
  return null;
});

Overlay.displayName = 'AlertDialogOverlayWeb';

function Portal(_props: PortalProps) {
  return null;
}

const Title = React.forwardRef<TitleRef, TitleProps>(() => {
  return null;
});

Title.displayName = 'AlertDialogTitleWeb';

const useRootContext = () => {
  throw new Error(
    'Cannot access the web useRootContext on a native platform. Please import from `@rn-primitives/alert-dialog` or `@rn-primitives/alert-dialog/native`'
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
