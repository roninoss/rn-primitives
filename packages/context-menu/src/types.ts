import {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
} from '@rn-primitives/types';

type ContextMenuRootProps = SlottableViewProps & {
  onOpenChange?: (open: boolean) => void;
  /**
   * Platform: NATIVE ONLY
   */
  relativeTo?: 'longPress' | 'trigger';
};

interface ContextMenuPortalProps extends ForceMountable {
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

type ContextMenuOverlayProps = ForceMountable &
  SlottablePressableProps & {
    /**
     * Platform: NATIVE ONLY
     */
    closeOnPress?: boolean;
  };

type ContextMenuItemProps = SlottablePressableProps & {
  textValue?: string;
  closeOnPress?: boolean;
};

type ContextMenuCheckboxItemProps = SlottablePressableProps & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  closeOnPress?: boolean;
  textValue?: string;
};

type ContextMenuRadioGroupProps = SlottableViewProps & {
  value: string | undefined;
  onValueChange: (value: string) => void;
};

type ContextMenuRadioItemProps = SlottablePressableProps & {
  value: string;
  textValue?: string;
  closeOnPress?: boolean;
};

type ContextMenuSeparatorProps = SlottableViewProps & {
  decorative?: boolean;
};

type ContextMenuSubProps = SlottableViewProps & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
};

type ContextMenuSubTriggerProps = SlottablePressableProps & {
  textValue?: string;
};

interface ContextMenuTriggerRef extends PressableRef {
  /**
   * Platform: NATIVE ONLY
   */
  open: () => void;
  /**
   * Platform: NATIVE ONLY
   */
  close: () => void;
}

type ContextMenuTriggerProps = SlottablePressableProps;
type ContextMenuContentProps = SlottableViewProps & PositionedContentProps;
type ContextMenuSubContentProps = SlottablePressableProps & ForceMountable;
type ContextMenuItemIndicatorProps = SlottableViewProps & ForceMountable;
type ContextMenuGroupProps = SlottableViewProps;
type ContextMenuLabelProps = SlottableTextProps;

export type {
  ContextMenuCheckboxItemProps,
  ContextMenuContentProps,
  ContextMenuGroupProps,
  ContextMenuItemIndicatorProps,
  ContextMenuItemProps,
  ContextMenuLabelProps,
  ContextMenuOverlayProps,
  ContextMenuPortalProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuRootProps,
  ContextMenuSeparatorProps,
  ContextMenuSubContentProps,
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
  ContextMenuTriggerProps,
  ContextMenuTriggerRef,
};
