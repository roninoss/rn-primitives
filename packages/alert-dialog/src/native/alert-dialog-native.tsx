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
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/alert-dialog/native is only supported on native.');
  }
  return null;
}

Root.displayName = 'AlertDialogRootNative';

const Trigger = React.forwardRef<TriggerRef, TriggerProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Trigger` from @rn-primitives/alert-dialog/native is only supported on native.');
  }
  return null;
});

Trigger.displayName = 'AlertDialogTriggerNative';

function Portal(_props: PortalProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Portal` from @rn-primitives/alert-dialog/native is only supported on native.');
  }
  return null;
}

const Overlay = React.forwardRef<OverlayRef, OverlayProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Overlay` from @rn-primitives/alert-dialog/native is only supported on native.');
  }
  return null;
});

Overlay.displayName = 'AlertDialogOverlayNative';

const Content = React.forwardRef<ContentRef, ContentProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Content` from @rn-primitives/alert-dialog/native is only supported on native.');
  }
  return null;
});

Content.displayName = 'AlertDialogContentNative';

const Cancel = React.forwardRef<CancelRef, CancelProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Cancel` from @rn-primitives/alert-dialog/native is only supported on native.');
  }
  return null;
});

Cancel.displayName = 'AlertDialogCloseNative';

const Action = React.forwardRef<ActionRef, ActionProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Action` from @rn-primitives/alert-dialog/native is only supported on native.');
  }
  return null;
});

Action.displayName = 'AlertDialogActionNative';

const Title = React.forwardRef<TitleRef, TitleProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Title` from @rn-primitives/alert-dialog/native is only supported on native.');
  }
  return null;
});

Title.displayName = 'AlertDialogTitleNative';

const Description = React.forwardRef<DescriptionRef, DescriptionProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log(
      '`Description` from @rn-primitives/alert-dialog/native is only supported on native.'
    );
  }
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
