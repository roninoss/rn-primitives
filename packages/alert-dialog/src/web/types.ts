import type { Portal } from '@radix-ui/react-alert-dialog';
import type { Slottable } from '@rn-primitives/types';
import type {
  BaseAlertDialogActionProps,
  BaseAlertDialogCancelProps,
  BaseAlertDialogContentProps,
  BaseAlertDialogDescriptionProps,
  BaseAlertDialogOverlayProps,
  BaseAlertDialogPortalProps,
  BaseAlertDialogRootProps,
  BaseAlertDialogTitleProps,
  BaseAlertDialogTriggerProps,
} from '../base-types';

type ContentPropsWebOnly = React.ComponentProps<'div'>;

type TriggerPropsWebOnly = React.ComponentProps<'button'>;

type ActionPropsWebOnly = React.ComponentProps<'button'>;

type CancelPropsWebOnly = React.ComponentProps<'button'>;

type DescriptionPropsWebOnly = React.ComponentProps<'p'>;

type OverlayPropsWebOnly = React.ComponentProps<'div'>;

type PortalPropsWebOnly = Pick<React.ComponentProps<typeof Portal>, 'container'>;

type TitlePropsWebOnly = React.ComponentProps<'h1'>;

type RootProps = BaseAlertDialogRootProps & { children?: React.ReactNode };

type ActionProps = Slottable<BaseAlertDialogActionProps & ActionPropsWebOnly>;

type CancelProps = Slottable<BaseAlertDialogCancelProps & CancelPropsWebOnly>;

type DescriptionProps = Slottable<BaseAlertDialogDescriptionProps & DescriptionPropsWebOnly>;

type OverlayProps = Slottable<BaseAlertDialogOverlayProps & OverlayPropsWebOnly>;

type PortalProps = BaseAlertDialogPortalProps & PortalPropsWebOnly;

type TitleProps = Slottable<BaseAlertDialogTitleProps & TitlePropsWebOnly>;

type TriggerProps = Slottable<BaseAlertDialogTriggerProps & TriggerPropsWebOnly>;

type ContentProps = Slottable<BaseAlertDialogContentProps & ContentPropsWebOnly>;

export type {
  ActionProps,
  ActionPropsWebOnly,
  CancelProps,
  CancelPropsWebOnly,
  ContentProps,
  ContentPropsWebOnly,
  DescriptionProps,
  DescriptionPropsWebOnly,
  OverlayProps,
  OverlayPropsWebOnly,
  PortalProps,
  PortalPropsWebOnly,
  RootProps,
  TitleProps,
  TitlePropsWebOnly,
  TriggerProps,
  TriggerPropsWebOnly,
};
