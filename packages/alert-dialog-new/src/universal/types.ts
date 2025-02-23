import type {
  BaseSlottablePressableProps,
  BaseSlottableTextProps,
  BaseSlottableViewProps,
  BasicPressEvents,
  Prettify,
} from '@rn-primitives/types';
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
import type {
  AlertDialogActionNativeOnlyProps,
  AlertDialogCancelNativeOnlyProps,
  AlertDialogContentNativeOnlyProps,
  AlertDialogDescriptionNativeOnlyProps,
  AlertDialogOverlayNativeOnlyProps,
  AlertDialogPortalNativeOnlyProps,
  AlertDialogTitleNativeOnlyProps,
  AlertDialogTriggerNativeOnlyProps,
} from '../native/types';
import type {
  AlertDialogActionWebOnlyProps,
  AlertDialogCancelWebOnlyProps,
  AlertDialogContentWebOnlyProps,
  AlertDialogDescriptionWebOnlyProps,
  AlertDialogOverlayWebOnlyProps,
  AlertDialogPortalWebOnlyProps,
  AlertDialogTitleWebOnlyProps,
  AlertDialogTriggerWebOnlyProps,
} from '../web/types';

type ContentProps = Prettify<
  BaseAlertDialogContentProps &
    BaseSlottableViewProps & {
      native?: AlertDialogContentNativeOnlyProps;
      web?: AlertDialogContentWebOnlyProps;
    }
>;

type RootProps = Prettify<
  BaseAlertDialogRootProps & {
    children?: React.ReactNode;
  }
>;

type TriggerProps = Prettify<
  BaseAlertDialogTriggerProps &
    BaseSlottablePressableProps & {
      native?: AlertDialogTriggerNativeOnlyProps;
      web?: AlertDialogTriggerWebOnlyProps;
    } & BasicPressEvents
>;
type TriggerRef = BaseAlertDialogTriggerRef;

type ActionProps = Prettify<
  BaseAlertDialogActionProps &
    BaseSlottablePressableProps & {
      native?: AlertDialogActionNativeOnlyProps;
      web?: AlertDialogActionWebOnlyProps;
    } & BasicPressEvents
>;

type CancelProps = Prettify<
  BaseAlertDialogCancelProps &
    BaseSlottablePressableProps & {
      native?: AlertDialogCancelNativeOnlyProps;
      web?: AlertDialogCancelWebOnlyProps;
    } & BasicPressEvents
>;
type CancelRef = BaseAlertDialogCancelRef;

type DescriptionProps = Prettify<
  BaseAlertDialogDescriptionProps &
    BaseSlottableTextProps & {
      native?: AlertDialogDescriptionNativeOnlyProps;
      web?: AlertDialogDescriptionWebOnlyProps;
    }
>;

type OverlayProps = Prettify<
  BaseAlertDialogOverlayProps &
    BaseSlottableViewProps & {
      native?: AlertDialogOverlayNativeOnlyProps;
      web?: AlertDialogOverlayWebOnlyProps;
    }
>;

type PortalProps = Prettify<
  BaseAlertDialogPortalProps & {
    native?: AlertDialogPortalNativeOnlyProps;
    web?: AlertDialogPortalWebOnlyProps;
  }
>;

type TitleProps = Prettify<
  BaseAlertDialogTitleProps &
    BaseSlottableTextProps & {
      native?: AlertDialogTitleNativeOnlyProps;
      web?: AlertDialogTitleWebOnlyProps;
    }
>;

export type {
  ActionProps,
  CancelProps,
  CancelRef,
  ContentProps,
  DescriptionProps,
  OverlayProps,
  PortalProps,
  RootProps,
  TitleProps,
  TriggerProps,
  TriggerRef,
};
