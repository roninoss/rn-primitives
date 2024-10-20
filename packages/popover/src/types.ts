import type {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
} from '@rn-primitives/types';

type PopoverRootProps = SlottableViewProps & { onOpenChange?: (open: boolean) => void };
interface PopoverPortalProps extends ForceMountable {
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

type PopoverOverlayProps = ForceMountable &
  SlottablePressableProps & {
    closeOnPress?: boolean;
  };

interface PopoverTriggerRef extends PressableRef {
  open: () => void;
  close: () => void;
}

type PopoverTriggerProps = SlottablePressableProps;
type PopoverContentProps = SlottableViewProps &
  PositionedContentProps & {
    /**
     * Platform: WEB ONLY
     */
    onOpenAutoFocus?: (event: Event) => void;
  };
type PopoverCloseProps = SlottablePressableProps;

export type {
  PopoverCloseProps,
  PopoverContentProps,
  PopoverOverlayProps,
  PopoverPortalProps,
  PopoverRootProps,
  PopoverTriggerProps,
  PopoverTriggerRef,
};
