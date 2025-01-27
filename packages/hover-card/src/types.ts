import type {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rnr-method/types';

interface SharedRootContext {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
}

type RootProps = SlottableViewProps & {
  onOpenChange?: (open: boolean) => void;
  /**
   * Platform: WEB ONLY
   * @default 700
   */
  openDelay?: number;
  /**
   * Platform: WEB ONLY
   * @default 300
   */
  closeDelay?: number;
};

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

type OverlayProps = ForceMountable &
  SlottablePressableProps & {
    closeOnPress?: boolean;
  };

type TriggerProps = SlottablePressableProps;
type ContentProps = SlottableViewProps & PositionedContentProps;

type OverlayRef = PressableRef;
type RootRef = ViewRef;
type TriggerRef = PressableRef & {
  open: () => void;
  close: () => void;
};
type ContentRef = ViewRef;

export type {
  ContentProps,
  ContentRef,
  OverlayProps,
  OverlayRef,
  PortalProps,
  SharedRootContext,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
};
