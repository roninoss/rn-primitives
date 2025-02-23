import type {
  AnimatablePressableProps,
  AnimatableTextProps,
  AnimatableViewProps,
} from '@rn-primitives/animatable';
import type { PressableRef, TextRef, ViewRef } from '@rn-primitives/types';
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
  BaseAlertDialogTriggerRef,
} from '../base-types';

type AlertDialogActionNativeOnlyProps = AnimatablePressableProps;
type AlertDialogActionNativeOnlyRef = PressableRef;
type AlertDialogCancelNativeOnlyProps = AnimatablePressableProps;
type AlertDialogCancelNativeOnlyRef = PressableRef;
type AlertDialogContentNativeOnlyProps = AnimatableViewProps;
type AlertDialogContentNativeOnlyRef = ViewRef;
type AlertDialogDescriptionNativeOnlyProps = AnimatableTextProps;
type AlertDialogDescriptionNativeOnlyRef = TextRef;
type AlertDialogOverlayNativeOnlyProps = AnimatableViewProps;
type AlertDialogOverlayNativeOnlyRef = ViewRef;
type AlertDialogPortalNativeOnlyProps = {
  hostName?: string;
  children?: React.ReactNode;
};
type AlertDialogTitleNativeOnlyProps = AnimatableTextProps;
type AlertDialogTitleNativeOnlyRef = TextRef;
type AlertDialogTriggerNativeOnlyProps = AnimatablePressableProps;
type AlertDialogTriggerNativeOnlyRef = PressableRef;

type RootProps = BaseAlertDialogRootProps & { children?: React.ReactNode };
type ActionProps = AlertDialogActionNativeOnlyProps & BaseAlertDialogActionProps;
type ActionRef = AlertDialogActionNativeOnlyRef;
type CancelProps = AlertDialogCancelNativeOnlyProps & BaseAlertDialogCancelProps;
type CancelRef = AlertDialogCancelNativeOnlyRef;
type ContentProps = AlertDialogContentNativeOnlyProps & BaseAlertDialogContentProps;
type ContentRef = AlertDialogContentNativeOnlyRef;
type DescriptionProps = AlertDialogDescriptionNativeOnlyProps & BaseAlertDialogDescriptionProps;
type DescriptionRef = AlertDialogDescriptionNativeOnlyRef;
type OverlayProps = AlertDialogOverlayNativeOnlyProps & BaseAlertDialogOverlayProps;
type OverlayRef = AlertDialogOverlayNativeOnlyRef;
type PortalProps = AlertDialogPortalNativeOnlyProps & BaseAlertDialogPortalProps;
type TitleProps = AlertDialogTitleNativeOnlyProps & BaseAlertDialogTitleProps;
type TitleRef = AlertDialogTitleNativeOnlyRef;
type TriggerProps = AlertDialogTriggerNativeOnlyProps & BaseAlertDialogTriggerProps;
type TriggerRef = AlertDialogTriggerNativeOnlyRef & BaseAlertDialogTriggerRef;

export type {
  ActionProps,
  ActionRef,
  AlertDialogActionNativeOnlyProps,
  AlertDialogCancelNativeOnlyProps,
  AlertDialogContentNativeOnlyProps,
  AlertDialogContentNativeOnlyRef,
  AlertDialogDescriptionNativeOnlyProps,
  AlertDialogDescriptionNativeOnlyRef,
  AlertDialogOverlayNativeOnlyProps,
  AlertDialogOverlayNativeOnlyRef,
  AlertDialogPortalNativeOnlyProps,
  AlertDialogTitleNativeOnlyProps,
  AlertDialogTitleNativeOnlyRef,
  AlertDialogTriggerNativeOnlyProps,
  AlertDialogTriggerNativeOnlyRef,
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
