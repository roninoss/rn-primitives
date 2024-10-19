import type {
  ForceMountable,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
} from '@rn-primitives/types';

type RootContext = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
};

type DialogRootProps = SlottableViewProps & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (value: boolean) => void;
};

interface DialogPortalProps extends ForceMountable {
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
type DialogOverlayProps = ForceMountable &
  SlottablePressableProps & {
    /**
     * Platform: NATIVE ONLY - default: true
     */
    closeOnPress?: boolean;
  };
type DialogContentProps = ForceMountable &
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
    /**
     * Platform: WEB ONLY
     */
    onInteractOutside?: (ev: Event) => void;
    /**
     * Platform: WEB ONLY
     */
    onPointerDownOutside?: (ev: Event) => void;
  };

type DialogTriggerProps = SlottablePressableProps;
type DialogCloseProps = SlottablePressableProps;
type DialogTitleProps = SlottableTextProps;
type DialogDescriptionProps = SlottableTextProps;

export type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootProps,
  DialogTitleProps,
  DialogTriggerProps,
  RootContext,
};
