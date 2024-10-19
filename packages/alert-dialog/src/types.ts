import type {
  ForceMountable,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
} from '@rn-primitives/types';

type AlertDialogRootProps = {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  defaultOpen?: boolean;
} & SlottableViewProps;

interface RootContext {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

interface AlertDialogPortalProps extends ForceMountable {
  children: React.ReactNode;
  /**
   * Platform: NATIVE ONLY
   */
  hostName?: string;
  /**
   * Platform: WEB ONLY
   */
  container?: HTMLElement | null | undefined;
}
type AlertDialogOverlayProps = ForceMountable & SlottableViewProps;

type AlertDialogContentProps = ForceMountable &
  SlottableViewProps & {
    /**
     * Platform: WEB ONLY
     */
    onOpenAutoFocus?: (ev: Event) => void;
    /**
     * Platform: WEB ONLY
     */
    onCloseAutoFocus?: (ev: Event) => void;
    /**
     * Platform: WEB ONLY
     */
    onEscapeKeyDown?: (ev: Event) => void;
  };

type AlertDialogTriggerProps = SlottablePressableProps;
type AlertDialogCancelProps = SlottablePressableProps;
type AlertDialogActionProps = SlottablePressableProps;
type AlertDialogTitleProps = SlottableTextProps;
type AlertDialogDescriptionProps = SlottableTextProps;

export type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogOverlayProps,
  AlertDialogPortalProps,
  AlertDialogRootProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
  RootContext,
};
