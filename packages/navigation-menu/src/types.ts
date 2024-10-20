import type {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rn-primitives/types';
import type { ViewProps } from 'react-native';

type RootProps = SlottableViewProps & {
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

type ItemProps = SlottableViewProps & {
  value: string | undefined;
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

type LinkProps = SlottablePressableProps & {
  active?: boolean;
};

type ListProps = SlottableViewProps;
type TriggerProps = SlottablePressableProps;
type ContentProps = SlottableViewProps & PositionedContentProps;
type IndicatorProps = SlottableViewProps;
type ViewportProps = Omit<ViewProps, 'children'>;

type ContentRef = ViewRef;
type IndicatorRef = ViewRef;
type ItemRef = ViewRef;
type LinkRef = PressableRef;
type ListRef = ViewRef;
type RootRef = ViewRef;
type ViewportRef = ViewRef;
type TriggerRef = PressableRef;

export type {
  ContentProps,
  ContentRef,
  IndicatorProps,
  IndicatorRef,
  ItemProps,
  ItemRef,
  LinkProps,
  LinkRef,
  ListProps,
  ListRef,
  PortalProps,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
  ViewportProps,
  ViewportRef,
};
