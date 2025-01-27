import type {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '@rnr-method/types';

type Option =
  | {
      value: string;
      label: string;
    }
  | undefined;

interface SharedRootContext {
  value: Option;
  onValueChange: (option: Option) => void;
  disabled?: boolean;
}

type RootProps = SlottableViewProps & {
  value?: Option;
  defaultValue?: Option;
  onValueChange?: (option: Option) => void;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  /**
   * Platform: WEB ONLY
   */
  dir?: 'ltr' | 'rtl';
  /**
   * Platform: WEB ONLY
   */
  name?: string;
  /**
   * Platform: WEB ONLY
   */
  required?: boolean;
};

type ValueProps = SlottableTextProps & {
  placeholder: string;
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
  PositionedContentProps & {
    /**
     * Platform: WEB ONLY
     */
    position?: 'popper' | 'item-aligned' | undefined;
  };

type ItemProps = SlottablePressableProps & {
  value: string;
  label: string;
  closeOnPress?: boolean;
};

type TriggerProps = SlottablePressableProps;

type ItemTextProps = Omit<SlottableTextProps, 'children'>;
type ItemIndicatorProps = SlottableViewProps & ForceMountable;
type GroupProps = SlottableViewProps;
type LabelProps = SlottableTextProps;
type SeparatorProps = SlottableViewProps & {
  decorative?: boolean;
};

/**
 * PLATFORM: WEB ONLY
 */
type ScrollUpButtonProps = React.ComponentPropsWithoutRef<'div'>;
/**
 * PLATFORM: WEB ONLY
 */
type ScrollDownButtonProps = React.ComponentPropsWithoutRef<'div'>;
/**
 * PLATFORM: WEB ONLY
 */
type ViewportProps = React.ComponentPropsWithoutRef<'div'>;

type ContentRef = ViewRef;
type GroupRef = ViewRef;
type IndicatorRef = ViewRef;
type ItemRef = PressableRef;
type ItemIndicatorRef = ViewRef;
type ItemTextRef = TextRef;
type LabelRef = TextRef;
type OverlayRef = PressableRef;
type RootRef = ViewRef;
type SeparatorRef = ViewRef;
type TriggerRef = PressableRef & {
  open: () => void;
  close: () => void;
};
type ValueRef = TextRef;

export type {
  ContentProps,
  ContentRef,
  GroupProps,
  GroupRef,
  IndicatorRef,
  ItemIndicatorProps,
  ItemIndicatorRef,
  ItemProps,
  ItemRef,
  ItemTextProps,
  ItemTextRef,
  LabelProps,
  LabelRef,
  Option,
  OverlayProps,
  OverlayRef,
  PortalProps,
  RootProps,
  RootRef,
  ScrollDownButtonProps,
  ScrollUpButtonProps,
  SeparatorProps,
  SeparatorRef,
  SharedRootContext,
  TriggerProps,
  TriggerRef,
  ValueProps,
  ValueRef,
  ViewportProps,
};
