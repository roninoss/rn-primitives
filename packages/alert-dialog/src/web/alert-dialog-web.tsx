import type {
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
import type { RootContextReturnType } from '../utils/contexts';

const Root = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/alert-dialog/web is only supported on web.');
  }
  return null;
}) as typeof AlertDialog;

const Trigger = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Trigger` from @rn-primitives/alert-dialog/web is only supported on web.');
  }
  return null;
}) as unknown as typeof AlertDialogTrigger;

const Content = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Portal` from @rn-primitives/alert-dialog/web is only supported on web.');
  }
  return null;
}) as unknown as typeof AlertDialogContent;

const Action = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Overlay` from @rn-primitives/alert-dialog/web is only supported on web.');
  }
  return null;
}) as unknown as typeof AlertDialogAction;

const Cancel = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Content` from @rn-primitives/alert-dialog/web is only supported on web.');
  }
  return null;
}) as unknown as typeof AlertDialogCancel;

const Description = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Cancel` from @rn-primitives/alert-dialog/web is only supported on web.');
  }
  return null;
}) as unknown as typeof AlertDialogDescription;

const Overlay = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Action` from @rn-primitives/alert-dialog/web is only supported on web.');
  }
  return null;
}) as unknown as typeof AlertDialogOverlay;

const Portal = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Title` from @rn-primitives/alert-dialog/web is only supported on web.');
  }
  return null;
}) as unknown as typeof AlertDialogPortal;

const Title = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Description` from @rn-primitives/alert-dialog/web is only supported on web.');
  }
  return null;
}) as unknown as typeof AlertDialogTitle;

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
