import type {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import type { RootContextReturnType } from '../utils/contexts';

const Root = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/dialog/web is only supported on web.');
  }
  return null;
}) as typeof Dialog;

const Trigger = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Trigger` from @rn-primitives/dialog/web is only supported on web.');
  }
  return null;
}) as unknown as typeof DialogTrigger;

const Content = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Portal` from @rn-primitives/dialog/web is only supported on web.');
  }
  return null;
}) as unknown as typeof DialogContent;

const Close = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Content` from @rn-primitives/dialog/web is only supported on web.');
  }
  return null;
}) as unknown as typeof DialogClose;

const Description = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Cancel` from @rn-primitives/dialog/web is only supported on web.');
  }
  return null;
}) as unknown as typeof DialogDescription;

const Overlay = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Action` from @rn-primitives/dialog/web is only supported on web.');
  }
  return null;
}) as unknown as typeof DialogOverlay;

const Portal = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Title` from @rn-primitives/dialog/web is only supported on web.');
  }
  return null;
}) as unknown as typeof DialogPortal;

const Title = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Description` from @rn-primitives/dialog/web is only supported on web.');
  }
  return null;
}) as unknown as typeof DialogTitle;

const useRootContext = () => {
  throw new Error(
    'Cannot access the web useRootContext on a web platform. Please import from `@rn-primitives/dialog` or `@rn-primitives/dialog/web`'
  );
  return {} as RootContextReturnType;
};

export { Close, Content, Description, Overlay, Portal, Root, Title, Trigger, useRootContext };
