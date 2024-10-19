import type {
  ForceMountable,
  PositionedContentProps,
  SlottablePressableProps,
  SlottableViewProps,
} from '@rn-primitives/types';

type NavigationMenuRootProps = SlottableViewProps & {
  value: string | undefined;
  onValueChange: (value: string | undefined) => void;
  /**
   * Platform: WEB ONLY
   */
  delayDuration?: number;
  /**
   * Platform: WEB ONLY
   */
  skipDelayDuration?: number;
  /**
   * Platform: WEB ONLY
   */
  dir?: 'ltr' | 'rtl';
  /**
   * Platform: WEB ONLY
   */
  orientation?: 'horizontal' | 'vertical';
};

type NavigationMenuItemProps = SlottableViewProps & {
  value: string | undefined;
};

interface NavigationMenuPortalProps extends ForceMountable {
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

type NavigationMenuLinkProps = SlottablePressableProps & {
  active?: boolean;
};

type NavigationMenuListProps = SlottableViewProps;
type NavigationMenuTriggerProps = SlottablePressableProps;
type NavigationMenuContentProps = SlottableViewProps & PositionedContentProps;
type NavigationMenuIndicatorProps = SlottableViewProps;

export type {
  NavigationMenuContentProps,
  NavigationMenuIndicatorProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuPortalProps,
  NavigationMenuRootProps,
  NavigationMenuTriggerProps,
};
