import { RootContextReturnType } from '../utils/contexts';
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
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/alert-dialog/native is only supported on native.');
  }
  return null;
}

function Trigger(props: TriggerProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Trigger` from @rn-primitives/alert-dialog/native is only supported on native.');
  }
  return null;
}

function Portal(props: PortalProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Portal` from @rn-primitives/alert-dialog/native is only supported on native.');
  }
  return null;
}

function Overlay(props: OverlayProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Overlay` from @rn-primitives/alert-dialog/native is only supported on native.');
  }
  return null;
}

function Content(props: ContentProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Content` from @rn-primitives/alert-dialog/native is only supported on native.');
  }
  return null;
}

function Cancel(props: CancelProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Cancel` from @rn-primitives/alert-dialog/native is only supported on native.');
  }
  return null;
}

function Action(props: ActionProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Action` from @rn-primitives/alert-dialog/native is only supported on native.');
  }
  return null;
}

function Title(props: TitleProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Title` from @rn-primitives/alert-dialog/native is only supported on native.');
  }
  return null;
}

function Description(props: DescriptionProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log(
      '`Description` from @rn-primitives/alert-dialog/native is only supported on native.'
    );
  }
  return null;
}

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
