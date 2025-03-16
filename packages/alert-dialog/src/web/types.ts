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

type ContentPropsWebOnly = React.ComponentPropsWithRef<'div'>;

type ContentWebOnlyRef = React.ElementRef<typeof Content>;

type TriggerPropsWebOnly = React.ComponentPropsWithRef<'button'>;
type TriggerWebOnlyRef = React.ElementRef<typeof Trigger>;

type ActionPropsWebOnly = React.ComponentPropsWithRef<'button'>;
type ActionWebOnlyRef = React.ElementRef<typeof Action>;

type CancelPropsWebOnly = React.ComponentPropsWithRef<'button'>;
type CancelWebOnlyRef = React.ElementRef<typeof Cancel>;

type DescriptionPropsWebOnly = React.ComponentPropsWithRef<'p'>;
type DescriptionWebOnlyRef = React.ElementRef<typeof Description>;

type OverlayPropsWebOnly = React.ComponentPropsWithRef<'div'>;
type OverlayWebOnlyRef = React.ElementRef<typeof Overlay>;

type PortalPropsWebOnly = Pick<React.ComponentPropsWithoutRef<typeof Portal>, 'container'>;
type PortalWebOnlyRef = React.ElementRef<typeof Portal>;

type TitlePropsWebOnly = React.ComponentPropsWithRef<'h1'>;
type TitleWebOnlyRef = React.ElementRef<typeof Title>;

type RootProps = BaseAlertDialogRootProps & { children?: React.ReactNode };

type ActionProps = Slottable<BaseAlertDialogActionProps & ActionPropsWebOnly>;
type ActionRef = ActionWebOnlyRef;

type CancelProps = Slottable<BaseAlertDialogCancelProps & CancelPropsWebOnly>;
type CancelRef = CancelWebOnlyRef;

type DescriptionProps = Slottable<BaseAlertDialogDescriptionProps & DescriptionPropsWebOnly>;
type DescriptionRef = DescriptionWebOnlyRef;

type OverlayProps = Slottable<BaseAlertDialogOverlayProps & OverlayPropsWebOnly>;
type OverlayRef = OverlayWebOnlyRef;

type PortalProps = BaseAlertDialogPortalProps & PortalPropsWebOnly;

type TitleProps = Slottable<BaseAlertDialogTitleProps & TitlePropsWebOnly>;
type TitleRef = TitleWebOnlyRef;

type TriggerProps = Slottable<BaseAlertDialogTriggerProps & TriggerPropsWebOnly>;
type TriggerRef = TriggerWebOnlyRef;

type ContentProps = Slottable<BaseAlertDialogContentProps & ContentPropsWebOnly>;
type ContentRef = ContentWebOnlyRef;

export type {
  ActionProps,
  ActionPropsWebOnly,
  ActionRef,
  ActionWebOnlyRef,
  CancelProps,
  CancelPropsWebOnly,
  CancelRef,
  CancelWebOnlyRef,
  ContentProps,
  ContentPropsWebOnly,
  ContentRef,
  ContentWebOnlyRef,
  DescriptionProps,
  DescriptionPropsWebOnly,
  DescriptionRef,
  DescriptionWebOnlyRef,
  OverlayProps,
  OverlayPropsWebOnly,
  OverlayRef,
  OverlayWebOnlyRef,
  PortalProps,
  PortalPropsWebOnly,
  PortalWebOnlyRef,
  RootProps,
  TitleProps,
  TitlePropsWebOnly,
  TitleRef,
  TitleWebOnlyRef,
  TriggerProps,
  TriggerPropsWebOnly,
  TriggerRef,
  TriggerWebOnlyRef,
};
