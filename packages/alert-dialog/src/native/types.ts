import type { PressableProps, TextProps, ViewProps } from '@rn-primitives/core/dist/native';
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
type CancelPropsNativeOnly = PressableProps;
type ContentPropsNativeOnly = ViewProps;
type DescriptionPropsNativeOnly = TextProps;
type OverlayPropsNativeOnly = ViewProps;
type PortalPropsNativeOnly = {
  hostName?: string;
  children?: React.ReactNode;
};
type TitlePropsNativeOnly = TextProps;
type TriggerPropsNativeOnly = PressableProps;

type RootProps = BaseAlertDialogRootProps & { children?: React.ReactNode };
type ActionProps = ActionPropsNativeOnly & BaseAlertDialogActionProps;
type CancelProps = CancelPropsNativeOnly & BaseAlertDialogCancelProps;
type ContentProps = ContentPropsNativeOnly & BaseAlertDialogContentProps;
type DescriptionProps = DescriptionPropsNativeOnly & BaseAlertDialogDescriptionProps;
type OverlayProps = OverlayPropsNativeOnly & BaseAlertDialogOverlayProps;
type PortalProps = PortalPropsNativeOnly & BaseAlertDialogPortalProps;
type TitleProps = TitlePropsNativeOnly & BaseAlertDialogTitleProps;
type TriggerProps = TriggerPropsNativeOnly & BaseAlertDialogTriggerProps;

export type {
  ActionProps,
  ActionPropsNativeOnly,
  CancelProps,
  CancelPropsNativeOnly,
  ContentProps,
  ContentPropsNativeOnly,
  DescriptionProps,
  DescriptionPropsNativeOnly,
  OverlayProps,
  OverlayPropsNativeOnly,
  PortalProps,
  PortalPropsNativeOnly,
  RootProps,
  TitleProps,
  TitlePropsNativeOnly,
  TriggerProps,
  TriggerPropsNativeOnly,
};
