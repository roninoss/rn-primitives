import type {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rnr-method/types';

type RootProps = SlottableViewProps & {
  onOpenChange?: (open: boolean) => void;
  /**
   * Platform: WEB ONLY
   * @default 700
   */
  delayDuration?: number;
  /**
   * Platform: WEB ONLY
   * @default 300
   */
  skipDelayDuration?: number;
  /**
   * Platform: WEB ONLY
   */
  disableHoverableContent?: boolean;
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

type ContentProps = SlottableViewProps &
  Omit<PositionedContentProps, 'side'> & {
    /**
     * `left` and `right` are only supported on web.
     */
    side?: 'top' | 'right' | 'bottom' | 'left';
  };

type TriggerProps = SlottablePressableProps;

type RootRef = ViewRef;
type ContentRef = ViewRef;
type OverlayRef = PressableRef;
type TriggerRef = PressableRef & {
  open: () => void;
  close: () => void;
};

export type {
  ContentProps,
  ContentRef,
  OverlayProps,
  OverlayRef,
  PortalProps,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
};
