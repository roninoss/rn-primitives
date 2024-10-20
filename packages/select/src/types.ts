import type {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
} from '@rn-primitives/types';

type Option =
  | {
      value: string;
      label: string;
    }
  | undefined;

interface SelectRootContext {
  value: Option;
  onValueChange: (option: Option) => void;
  disabled?: boolean;
}

type SelectRootProps = SlottableViewProps & {
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

type SelectValueProps = SlottableTextProps & {
  placeholder: string;
};

interface SelectPortalProps extends ForceMountable {
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

type SelectOverlayProps = ForceMountable &
  SlottablePressableProps & {
    closeOnPress?: boolean;
  };

type SelectContentProps = SlottableViewProps &
  PositionedContentProps & {
    /**
     * Platform: WEB ONLY
     */
    position?: 'popper' | 'item-aligned' | undefined;
  };

type SelectItemProps = SlottablePressableProps & {
  value: string;
  label: string;
  closeOnPress?: boolean;
};

interface SelectTriggerRef extends PressableRef {
  open: () => void;
  close: () => void;
}

type SelectTriggerProps = SlottablePressableProps;

type SelectItemTextProps = SlottableTextProps;
type SelectItemIndicatorProps = SlottableViewProps & ForceMountable;
type SelectGroupProps = SlottableViewProps;
type SelectLabelProps = SlottableTextProps;
type SelectSeparatorProps = SlottableViewProps & {
  decorative?: boolean;
};

export type {
  Option,
  SelectContentProps,
  SelectGroupProps,
  SelectItemIndicatorProps,
  SelectItemProps,
  SelectItemTextProps,
  SelectLabelProps,
  SelectOverlayProps,
  SelectPortalProps,
  SelectRootContext,
  SelectRootProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectTriggerRef,
  SelectValueProps,
};
