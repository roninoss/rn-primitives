import type { PressableProps, TextProps, ViewProps } from '@rn-primitives/core/dist/native';
import type {
  BaseDialogCloseProps,
  BaseDialogContentProps,
  BaseDialogDescriptionProps,
  BaseDialogOverlayProps,
  BaseDialogPortalProps,
  BaseDialogRootProps,
  BaseDialogTitleProps,
  BaseDialogTriggerProps,
} from '../base-types';

type ClosePropsNativeOnly = PressableProps;
type ContentPropsNativeOnly = ViewProps;
type DescriptionPropsNativeOnly = TextProps;
type OverlayPropsNativeOnly = ViewProps;
type PortalPropsNativeOnly = {
  hostName?: string;
  children?: React.ReactNode;
};
type TitlePropsNativeOnly = TextProps;
type TriggerPropsNativeOnly = PressableProps;

type RootProps = BaseDialogRootProps & { children?: React.ReactNode };
type CloseProps = ClosePropsNativeOnly & BaseDialogCloseProps;
type ContentProps = ContentPropsNativeOnly & BaseDialogContentProps;
type DescriptionProps = DescriptionPropsNativeOnly & BaseDialogDescriptionProps;
type OverlayProps = OverlayPropsNativeOnly & BaseDialogOverlayProps;
type PortalProps = PortalPropsNativeOnly & BaseDialogPortalProps;
type TitleProps = TitlePropsNativeOnly & BaseDialogTitleProps;
type TriggerProps = TriggerPropsNativeOnly & BaseDialogTriggerProps;

export type {
  CloseProps,
  ClosePropsNativeOnly,
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
