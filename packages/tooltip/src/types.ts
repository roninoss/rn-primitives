import type {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
} from '@rn-primitives/types';

type TooltipRootProps = SlottableViewProps & {
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

interface TooltipPortalProps extends ForceMountable {
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

type TooltipOverlayProps = ForceMountable &
  SlottablePressableProps & {
    closeOnPress?: boolean;
  };

interface TooltipTriggerRef extends PressableRef {
  open: () => void;
  close: () => void;
}

type TooltipContentProps = SlottableViewProps &
  Omit<PositionedContentProps, 'side'> & {
    /**
     * `left` and `right` are only supported on web.
     */
    side?: 'top' | 'right' | 'bottom' | 'left';
  };

type TooltipTriggerProps = SlottablePressableProps;

export type {
  TooltipContentProps,
  TooltipOverlayProps,
  TooltipPortalProps,
  TooltipRootProps,
  TooltipTriggerProps,
  TooltipTriggerRef,
};
