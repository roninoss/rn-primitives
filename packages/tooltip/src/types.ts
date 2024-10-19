import type { ForceMountable, PositionedContentProps, PressableRef } from '@rn-primitives/types';

interface TooltipRootProps {
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
}

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

interface TooltipOverlayProps extends ForceMountable {
  closeOnPress?: boolean;
}

interface TooltipTriggerRef extends PressableRef {
  open: () => void;
  close: () => void;
}

interface TooltipContentProps extends Omit<PositionedContentProps, 'side'> {
  /**
   * `left` and `right` are only supported on web.
   */
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export type {
  TooltipContentProps,
  TooltipOverlayProps,
  TooltipPortalProps,
  TooltipRootProps,
  TooltipTriggerRef,
};
