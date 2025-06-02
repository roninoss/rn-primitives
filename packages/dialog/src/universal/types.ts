import type {
  PressablePropsUniversal,
  TextPropsUniversal,
  ViewPropsUniversal,
} from '@rn-primitives/core';
import type { Prettify } from '@rn-primitives/types';
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
import type {
  ClosePropsNativeOnly,
  ContentPropsNativeOnly,
  DescriptionPropsNativeOnly,
  OverlayPropsNativeOnly,
  PortalPropsNativeOnly,
  TitlePropsNativeOnly,
  TriggerPropsNativeOnly,
} from '../native/types';
import type {
  ClosePropsWebOnly,
  ContentPropsWebOnly,
  DescriptionPropsWebOnly,
  OverlayPropsWebOnly,
  PortalPropsWebOnly,
  TitlePropsWebOnly,
  TriggerPropsWebOnly,
} from '../web/types';

type ContentProps = Prettify<
  BaseDialogContentProps &
    ViewPropsUniversal & {
      native?: ContentPropsNativeOnly;
      web?: ContentPropsWebOnly;
    }
>;

type RootProps = Prettify<
  BaseDialogRootProps & {
    children?: React.ReactNode;
  }
>;

type TriggerProps = Prettify<
  BaseDialogTriggerProps &
    PressablePropsUniversal & {
      native?: TriggerPropsNativeOnly;
      web?: TriggerPropsWebOnly;
    }
>;

type CloseProps = Prettify<
  BaseDialogCloseProps &
    PressablePropsUniversal & {
      native?: ClosePropsNativeOnly;
      web?: ClosePropsWebOnly;
    }
>;

type DescriptionProps = Prettify<
  BaseDialogDescriptionProps &
    TextPropsUniversal & {
      native?: DescriptionPropsNativeOnly;
      web?: DescriptionPropsWebOnly;
    }
>;

type OverlayProps = Prettify<
  BaseDialogOverlayProps &
    ViewPropsUniversal & {
      native?: OverlayPropsNativeOnly;
      web?: OverlayPropsWebOnly;
    }
>;

type PortalProps = Prettify<
  BaseDialogPortalProps & {
    native?: PortalPropsNativeOnly;
    web?: PortalPropsWebOnly;
  }
>;

type TitleProps = Prettify<
  BaseDialogTitleProps &
    TextPropsUniversal & {
      native?: TitlePropsNativeOnly;
      web?: TitlePropsWebOnly;
    }
>;

export type {
  CloseProps,
  ContentProps,
  DescriptionProps,
  OverlayProps,
  PortalProps,
  RootProps,
  TitleProps,
  TriggerProps,
};
