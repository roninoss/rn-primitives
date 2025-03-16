import type {
  AlertDialogContentProps,
  AlertDialogOverlayProps,
  AlertDialogPortalProps,
  AlertDialogProps,
} from '@radix-ui/react-alert-dialog';
import type { Prettify } from '@rn-primitives/types';

type BaseAlertDialogRootProps = Omit<Prettify<AlertDialogProps>, 'children'>;

type BaseAlertDialogTriggerProps = {};

type BaseAlertDialogPortalProps = Pick<AlertDialogPortalProps, 'forceMount' | 'children'>;

type BaseAlertDialogOverlayProps = Pick<AlertDialogOverlayProps, 'forceMount'>;

type BaseAlertDialogActionProps = {};

type BaseAlertDialogCancelProps = {};

type BaseAlertDialogTitleProps = {};

type BaseAlertDialogDescriptionProps = {};

type BaseAlertDialogContentProps = Pick<AlertDialogContentProps, 'forceMount'>;

type BaseAlertDialogRootContext = Required<
  Pick<BaseAlertDialogRootProps, 'open' | 'onOpenChange'>
> | null;

export type {
  BaseAlertDialogActionProps,
  BaseAlertDialogCancelProps,
  BaseAlertDialogContentProps,
  BaseAlertDialogDescriptionProps,
  BaseAlertDialogOverlayProps,
  BaseAlertDialogPortalProps,
  BaseAlertDialogRootContext,
  BaseAlertDialogRootProps,
  BaseAlertDialogTitleProps,
  BaseAlertDialogTriggerProps,
};
