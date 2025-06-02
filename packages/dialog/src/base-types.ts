import type {
  DialogContentProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogProps,
} from '@radix-ui/react-dialog';
import type { Prettify } from '@rn-primitives/types';

type BaseDialogRootProps = Omit<Prettify<DialogProps>, 'children'>;

type BaseDialogTriggerProps = {};

type BaseDialogPortalProps = Pick<DialogPortalProps, 'forceMount' | 'children'>;

type BaseDialogOverlayProps = Pick<DialogOverlayProps, 'forceMount'>;

type BaseDialogCloseProps = {};

type BaseDialogTitleProps = {};

type BaseDialogDescriptionProps = {};

type BaseDialogContentProps = Pick<DialogContentProps, 'forceMount'>;

type BaseDialogRootContext = Required<Pick<BaseDialogRootProps, 'open' | 'onOpenChange'>> | null;

export type {
  BaseDialogCloseProps,
  BaseDialogContentProps,
  BaseDialogDescriptionProps,
  BaseDialogOverlayProps,
  BaseDialogPortalProps,
  BaseDialogRootContext,
  BaseDialogRootProps,
  BaseDialogTitleProps,
  BaseDialogTriggerProps,
};
