import { RootContextReturnType } from '../utils/contexts';
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
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/dialog/native is only supported on native.');
  }
  return null;
}

function Trigger(props: TriggerProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Trigger` from @rn-primitives/dialog/native is only supported on native.');
  }
  return null;
}

function Portal(props: PortalProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Portal` from @rn-primitives/dialog/native is only supported on native.');
  }
  return null;
}

function Overlay(props: OverlayProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Overlay` from @rn-primitives/dialog/native is only supported on native.');
  }
  return null;
}

function Content(props: ContentProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Content` from @rn-primitives/dialog/native is only supported on native.');
  }
  return null;
}

function Close(props: CloseProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Cancel` from @rn-primitives/dialog/native is only supported on native.');
  }
  return null;
}

function Title(props: TitleProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Title` from @rn-primitives/dialog/native is only supported on native.');
  }
  return null;
}

function Description(props: DescriptionProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Description` from @rn-primitives/dialog/native is only supported on native.');
  }
  return null;
}

const useRootContext = () => {
  throw new Error(
    'Cannot access the native useRootContext on the web. Please import from `@rn-primitives/dialog` or `@rn-primitives/dialog/web`'
  );
  return {} as RootContextReturnType;
};

export { Close, Content, Description, Overlay, Portal, Root, Title, Trigger, useRootContext };
