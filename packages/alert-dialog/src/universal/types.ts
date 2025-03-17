import type {
  PressablePropsUniversal,
  TextPropsUniversal,
  ViewPropsUniversal,
} from '@rn-primitives/core';
import type { Prettify } from '@rn-primitives/types';
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
import type {
  ActionPropsNativeOnly,
  CancelPropsNativeOnly,
  ContentPropsNativeOnly,
  DescriptionPropsNativeOnly,
  OverlayPropsNativeOnly,
  PortalPropsNativeOnly,
  TitlePropsNativeOnly,
  TriggerPropsNativeOnly,
} from '../native/types';
import type {
  ActionPropsWebOnly,
  CancelPropsWebOnly,
  ContentPropsWebOnly,
  DescriptionPropsWebOnly,
  OverlayPropsWebOnly,
  PortalPropsWebOnly,
  TitlePropsWebOnly,
  TriggerPropsWebOnly,
} from '../web/types';

type ContentProps = Prettify<
  BaseAlertDialogContentProps &
    ViewPropsUniversal & {
      native?: ContentPropsNativeOnly;
      web?: ContentPropsWebOnly;
    }
>;

type RootProps = Prettify<
  BaseAlertDialogRootProps & {
    children?: React.ReactNode;
  }
>;

type TriggerProps = Prettify<
  BaseAlertDialogTriggerProps &
    PressablePropsUniversal & {
      native?: TriggerPropsNativeOnly;
      web?: TriggerPropsWebOnly;
    }
>;

type ActionProps = Prettify<
  BaseAlertDialogActionProps &
    PressablePropsUniversal & {
      native?: ActionPropsNativeOnly;
      web?: ActionPropsWebOnly;
    }
>;

type CancelProps = Prettify<
  BaseAlertDialogCancelProps &
    PressablePropsUniversal & {
      native?: CancelPropsNativeOnly;
      web?: CancelPropsWebOnly;
    }
>;

type DescriptionProps = Prettify<
  BaseAlertDialogDescriptionProps &
    TextPropsUniversal & {
      native?: DescriptionPropsNativeOnly;
      web?: DescriptionPropsWebOnly;
    }
>;

type OverlayProps = Prettify<
  BaseAlertDialogOverlayProps &
    ViewPropsUniversal & {
      native?: OverlayPropsNativeOnly;
      web?: OverlayPropsWebOnly;
    }
>;

type PortalProps = Prettify<
  BaseAlertDialogPortalProps & {
    native?: PortalPropsNativeOnly;
    web?: PortalPropsWebOnly;
  }
>;

type TitleProps = Prettify<
  BaseAlertDialogTitleProps &
    TextPropsUniversal & {
      native?: TitlePropsNativeOnly;
      web?: TitlePropsWebOnly;
    }
>;

export type {
  ActionProps,
  CancelProps,
  ContentProps,
  DescriptionProps,
  OverlayProps,
  PortalProps,
  RootProps,
  TitleProps,
  TriggerProps,
};
