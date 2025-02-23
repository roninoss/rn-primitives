import type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogOverlayProps,
  AlertDialogPortalProps,
  AlertDialogProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
} from '@radix-ui/react-alert-dialog';
import type { Prettify } from '@rn-primitives/types';

type BaseAlertDialogRootProps = Omit<Prettify<AlertDialogProps>, 'children'>;

type BaseAlertDialogTriggerProps = Pick<AlertDialogTriggerProps, 'asChild'>;

type BaseAlertDialogPortalProps = Pick<AlertDialogPortalProps, 'forceMount' | 'children'>;

type BaseAlertDialogOverlayProps = Pick<AlertDialogOverlayProps, 'asChild' | 'forceMount'>;

type BaseAlertDialogActionProps = Pick<AlertDialogActionProps, 'asChild'>;

type BaseAlertDialogCancelProps = Pick<AlertDialogCancelProps, 'asChild'>;

type BaseAlertDialogTitleProps = Pick<AlertDialogTitleProps, 'asChild'>;

type BaseAlertDialogDescriptionProps = Pick<AlertDialogDescriptionProps, 'asChild'>;

type BaseAlertDialogContentProps = Pick<AlertDialogContentProps, 'asChild' | 'forceMount'>;

type BaseAlertDialogTriggerRef = { trigger: () => void };

type BaseAlertDialogCancelRef = { cancel: () => void };

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
  BaseAlertDialogRootProps,
  BaseAlertDialogTitleProps,
  BaseAlertDialogTriggerProps,
  BaseAlertDialogTriggerRef,
  BaseAlertDialogRootContext,
  BaseAlertDialogCancelRef,
};
