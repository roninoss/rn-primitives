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
  Portal,
} from '@radix-ui/react-alert-dialog';

type ContentPropsWebOnly = React.ComponentProps<'div'>;

type TriggerPropsWebOnly = React.ComponentProps<'button'>;

type ActionPropsWebOnly = React.ComponentProps<'button'>;

type CancelPropsWebOnly = React.ComponentProps<'button'>;

type DescriptionPropsWebOnly = React.ComponentProps<'p'>;

type OverlayPropsWebOnly = React.ComponentProps<'div'>;

type PortalPropsWebOnly = Pick<React.ComponentProps<typeof Portal>, 'container'>;

type TitlePropsWebOnly = React.ComponentProps<'h1'>;

type RootProps = AlertDialogProps;

type ActionProps = AlertDialogActionProps;

type CancelProps = AlertDialogCancelProps;

type DescriptionProps = AlertDialogDescriptionProps;

type OverlayProps = AlertDialogOverlayProps;

type PortalProps = AlertDialogPortalProps;

type TitleProps = AlertDialogTitleProps;

type TriggerProps = AlertDialogTriggerProps;

type ContentProps = AlertDialogContentProps;

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
