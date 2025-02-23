import type {
  Action,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Title,
  Trigger,
} from '@radix-ui/react-alert-dialog';
import type { PropsWithout } from '@rn-primitives/types';
import type {
  BaseAlertDialogActionProps,
  BaseAlertDialogCancelProps,
  BaseAlertDialogCancelRef,
  BaseAlertDialogContentProps,
  BaseAlertDialogDescriptionProps,
  BaseAlertDialogOverlayProps,
  BaseAlertDialogPortalProps,
  BaseAlertDialogRootProps,
  BaseAlertDialogTitleProps,
  BaseAlertDialogTriggerProps,
  BaseAlertDialogTriggerRef,
} from '../base-types';

type AlertDialogContentWebOnlyProps = PropsWithout<
  React.ComponentPropsWithoutRef<typeof Content>,
  BaseAlertDialogContentProps
>;
type AlertDialogContentWebOnlyRef = React.ElementRef<typeof Content>;

type AlertDialogTriggerWebOnlyProps = PropsWithout<
  React.ComponentPropsWithoutRef<typeof Trigger>,
  BaseAlertDialogTriggerProps
>;
type AlertDialogTriggerWebOnlyRef = React.ElementRef<typeof Trigger>;

type AlertDialogActionWebOnlyProps = PropsWithout<
  React.ComponentPropsWithoutRef<typeof Action>,
  BaseAlertDialogActionProps
>;
type AlertDialogActionWebOnlyRef = React.ElementRef<typeof Action>;

type AlertDialogCancelWebOnlyProps = PropsWithout<
  React.ComponentPropsWithoutRef<typeof Cancel>,
  BaseAlertDialogCancelProps
>;
type AlertDialogCancelWebOnlyRef = React.ElementRef<typeof Cancel>;

type AlertDialogDescriptionWebOnlyProps = PropsWithout<
  React.ComponentPropsWithoutRef<typeof Description>,
  BaseAlertDialogDescriptionProps
>;
type AlertDialogDescriptionWebOnlyRef = React.ElementRef<typeof Description>;

type AlertDialogOverlayWebOnlyProps = PropsWithout<
  React.ComponentPropsWithoutRef<typeof Overlay>,
  BaseAlertDialogOverlayProps
>;
type AlertDialogOverlayWebOnlyRef = React.ElementRef<typeof Overlay>;

type AlertDialogPortalWebOnlyProps = PropsWithout<
  React.ComponentPropsWithoutRef<typeof Portal>,
  BaseAlertDialogPortalProps
>;
type AlertDialogPortalWebOnlyRef = React.ElementRef<typeof Portal>;

type AlertDialogTitleWebOnlyProps = PropsWithout<
  React.ComponentPropsWithoutRef<typeof Title>,
  BaseAlertDialogTitleProps
>;
type AlertDialogTitleWebOnlyRef = React.ElementRef<typeof Title>;

type RootProps = BaseAlertDialogRootProps & { children?: React.ReactNode };

type ActionProps = BaseAlertDialogActionProps & AlertDialogActionWebOnlyProps;
type ActionRef = AlertDialogActionWebOnlyRef;

type CancelProps = BaseAlertDialogCancelProps & AlertDialogCancelWebOnlyProps;
type CancelRef = AlertDialogCancelWebOnlyRef & BaseAlertDialogCancelRef;

type DescriptionProps = BaseAlertDialogDescriptionProps & AlertDialogDescriptionWebOnlyProps;
type DescriptionRef = AlertDialogDescriptionWebOnlyRef;

type OverlayProps = BaseAlertDialogOverlayProps & AlertDialogOverlayWebOnlyProps;
type OverlayRef = AlertDialogOverlayWebOnlyRef;

type PortalProps = BaseAlertDialogPortalProps & AlertDialogPortalWebOnlyProps;

type TitleProps = BaseAlertDialogTitleProps & AlertDialogTitleWebOnlyProps;
type TitleRef = AlertDialogTitleWebOnlyRef;

type TriggerProps = BaseAlertDialogTriggerProps & AlertDialogTriggerWebOnlyProps;
type TriggerRef = AlertDialogTriggerWebOnlyRef & BaseAlertDialogTriggerRef;

type ContentProps = BaseAlertDialogContentProps & AlertDialogContentWebOnlyProps;
type ContentRef = AlertDialogContentWebOnlyRef;

export type {
  ActionProps,
  ActionRef,
  AlertDialogActionWebOnlyProps,
  AlertDialogActionWebOnlyRef,
  AlertDialogCancelWebOnlyProps,
  AlertDialogCancelWebOnlyRef,
  AlertDialogContentWebOnlyProps,
  AlertDialogContentWebOnlyRef,
  AlertDialogDescriptionWebOnlyProps,
  AlertDialogDescriptionWebOnlyRef,
  AlertDialogOverlayWebOnlyProps,
  AlertDialogOverlayWebOnlyRef,
  AlertDialogPortalWebOnlyProps,
  AlertDialogPortalWebOnlyRef,
  AlertDialogTitleWebOnlyProps,
  AlertDialogTitleWebOnlyRef,
  AlertDialogTriggerWebOnlyProps,
  AlertDialogTriggerWebOnlyRef,
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
};
