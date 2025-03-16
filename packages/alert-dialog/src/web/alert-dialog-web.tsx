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
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/alert-dialog/web is only supported on web.');
  }
  return null;
}

const Trigger = React.forwardRef<TriggerRef, TriggerProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Trigger` from @rn-primitives/alert-dialog/web is only supported on web.');
  }
  return null;
});

Trigger.displayName = 'AlertDialogTriggerWeb';

const Content = React.forwardRef<ContentRef, ContentProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Portal` from @rn-primitives/alert-dialog/web is only supported on web.');
  }
  return null;
});

Content.displayName = 'AlertDialogContentWeb';

const Action = React.forwardRef<ActionRef, ActionProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Overlay` from @rn-primitives/alert-dialog/web is only supported on web.');
  }
  return null;
});

Action.displayName = 'AlertDialogActionWeb';

const Cancel = React.forwardRef<CancelRef, CancelProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Content` from @rn-primitives/alert-dialog/web is only supported on web.');
  }
  return null;
});

Cancel.displayName = 'AlertDialogCancelWeb';

const Description = React.forwardRef<DescriptionRef, DescriptionProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Cancel` from @rn-primitives/alert-dialog/web is only supported on web.');
  }
  return null;
});

Description.displayName = 'AlertDialogDescriptionWeb';

const Overlay = React.forwardRef<OverlayRef, OverlayProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Action` from @rn-primitives/alert-dialog/web is only supported on web.');
  }
  return null;
});

Overlay.displayName = 'AlertDialogOverlayWeb';

function Portal(_props: PortalProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Title` from @rn-primitives/alert-dialog/web is only supported on web.');
  }
  return null;
}

const Title = React.forwardRef<TitleRef, TitleProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Description` from @rn-primitives/alert-dialog/web is only supported on web.');
  }
  return null;
});

Title.displayName = 'AlertDialogTitleWeb';

const useRootContext = () => {
  throw new Error(
    'Cannot access the web useRootContext on a web platform. Please import from `@rn-primitives/alert-dialog` or `@rn-primitives/alert-dialog/web`'
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
