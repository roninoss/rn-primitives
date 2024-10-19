import type {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
} from '@rn-primitives/types';

interface HoverCardRootContext {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
}

type HoverCardRootProps = SlottableViewProps & {
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

interface HoverCardPortalProps extends ForceMountable {
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

type HoverCardOverlayProps = ForceMountable &
  SlottablePressableProps & {
    closeOnPress?: boolean;
  };

interface HoverCardTriggerRef extends PressableRef {
  open: () => void;
  close: () => void;
}

type HoverCardTriggerProps = SlottablePressableProps;
type HoverCardContentProps = SlottableViewProps & PositionedContentProps;

export type {
  HoverCardOverlayProps,
  HoverCardPortalProps,
  HoverCardRootProps,
  HoverCardTriggerRef,
  HoverCardRootContext,
  HoverCardTriggerProps,
  HoverCardContentProps,
};
