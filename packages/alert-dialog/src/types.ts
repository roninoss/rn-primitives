import type {
  ForceMountable,
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '@rn-primitives/types';

type RootProps = {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  defaultOpen?: boolean;
} & SlottableViewProps;

interface RootContext {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

interface PortalProps extends ForceMountable {
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
type OverlayProps = ForceMountable & SlottableViewProps;

type ContentProps = ForceMountable &
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

type TriggerProps = SlottablePressableProps;
type CancelProps = SlottablePressableProps;
type ActionProps = SlottablePressableProps;
type TitleProps = SlottableTextProps;
type DescriptionProps = SlottableTextProps;

type ActionRef = PressableRef;
type CancelRef = PressableRef;
type ContentRef = ViewRef;
type DescriptionRef = TextRef;
type OverlayRef = ViewRef;
type RootRef = ViewRef;
type TitleRef = TextRef;
type TriggerRef = PressableRef;

export type {
  ActionProps,
  ActionRef,
  CancelProps,
  CancelRef,
  ContentProps,
  ContentRef,
  DescriptionProps,
  DescriptionRef,
  OverlayProps,
  OverlayRef,
  PortalProps,
  RootContext,
  RootProps,
  RootRef,
  TitleProps,
  TitleRef,
  TriggerProps,
  TriggerRef,
};
