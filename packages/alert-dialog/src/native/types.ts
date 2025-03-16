import type {
  PressableProps,
  PressableRef,
  TextProps,
  ViewProps,
} from '@rn-primitives/core/dist/native';
import type { TextRef, ViewRef } from '@rn-primitives/types';
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

type ActionPropsNativeOnly = PressableProps;
type ActionNativeOnlyRef = PressableRef;
type CancelPropsNativeOnly = PressableProps;
type CancelNativeOnlyRef = PressableRef;
type ContentPropsNativeOnly = ViewProps;
type ContentNativeOnlyRef = ViewRef;
type DescriptionPropsNativeOnly = TextProps;
type DescriptionNativeOnlyRef = TextRef;
type OverlayPropsNativeOnly = ViewProps;
type OverlayNativeOnlyRef = ViewRef;
type PortalPropsNativeOnly = {
  hostName?: string;
  children?: React.ReactNode;
};
type TitlePropsNativeOnly = TextProps;
type TitleNativeOnlyRef = TextRef;
type TriggerPropsNativeOnly = PressableProps;
type TriggerNativeOnlyRef = PressableRef;

type RootProps = BaseAlertDialogRootProps & { children?: React.ReactNode };
type ActionProps = ActionPropsNativeOnly & BaseAlertDialogActionProps;
type ActionRef = ActionNativeOnlyRef;
type CancelProps = CancelPropsNativeOnly & BaseAlertDialogCancelProps;
type CancelRef = CancelNativeOnlyRef;
type ContentProps = ContentPropsNativeOnly & BaseAlertDialogContentProps;
type ContentRef = ContentNativeOnlyRef;
type DescriptionProps = DescriptionPropsNativeOnly & BaseAlertDialogDescriptionProps;
type DescriptionRef = DescriptionNativeOnlyRef;
type OverlayProps = OverlayPropsNativeOnly & BaseAlertDialogOverlayProps;
type OverlayRef = OverlayNativeOnlyRef;
type PortalProps = PortalPropsNativeOnly & BaseAlertDialogPortalProps;
type TitleProps = TitlePropsNativeOnly & BaseAlertDialogTitleProps;
type TitleRef = TitleNativeOnlyRef;
type TriggerProps = TriggerPropsNativeOnly & BaseAlertDialogTriggerProps;
type TriggerRef = TriggerNativeOnlyRef;

export type {
  ActionProps,
  ActionPropsNativeOnly,
  ActionRef,
  CancelProps,
  CancelPropsNativeOnly,
  CancelRef,
  ContentNativeOnlyRef,
  ContentProps,
  ContentPropsNativeOnly,
  ContentRef,
  DescriptionNativeOnlyRef,
  DescriptionProps,
  DescriptionPropsNativeOnly,
  DescriptionRef,
  OverlayNativeOnlyRef,
  OverlayProps,
  OverlayPropsNativeOnly,
  OverlayRef,
  PortalProps,
  PortalPropsNativeOnly,
  RootProps,
  TitleNativeOnlyRef,
  TitleProps,
  TitlePropsNativeOnly,
  TitleRef,
  TriggerNativeOnlyRef,
  TriggerProps,
  TriggerPropsNativeOnly,
  TriggerRef,
};
