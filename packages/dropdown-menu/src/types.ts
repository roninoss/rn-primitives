import type {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
} from '@rn-primitives/types';

type DropdownMenuRootProps = SlottableViewProps & { onOpenChange?: (open: boolean) => void };

interface DropdownMenuPortalProps extends ForceMountable {
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

type DropdownMenuOverlayProps = ForceMountable &
  SlottablePressableProps & {
    closeOnPress?: boolean;
  };

type DropdownMenuItemProps = SlottablePressableProps & {
  textValue?: string;
  closeOnPress?: boolean;
};

type DropdownMenuCheckboxItemProps = SlottablePressableProps & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  closeOnPress?: boolean;
  textValue?: string;
};

type DropdownMenuRadioGroupProps = SlottableViewProps & {
  value: string | undefined;
  onValueChange: (value: string) => void;
};

type DropdownMenuRadioItemProps = SlottablePressableProps & {
  value: string;
  textValue?: string;
  closeOnPress?: boolean;
};

type DropdownMenuSeparatorProps = SlottableViewProps & {
  decorative?: boolean;
};

type DropdownMenuSubProps = SlottableViewProps & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
};

type DropdownMenuSubTriggerProps = SlottablePressableProps & {
  textValue?: string;
};

interface DropdownMenuTriggerRef extends PressableRef {
  open: () => void;
  close: () => void;
}

type DropdownMenuTriggerProps = SlottablePressableProps;
type DropdownMenuContentProps = SlottablePressableProps & PositionedContentProps;
type DropdownMenuSubContentProps = SlottablePressableProps & ForceMountable;
type DropdownMenuItemIndicatorProps = SlottableViewProps & ForceMountable;
type DropdownMenuGroupProps = SlottableViewProps;
type DropdownMenuLabelProps = SlottableTextProps;

export type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuGroupProps,
  DropdownMenuItemIndicatorProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuOverlayProps,
  DropdownMenuPortalProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuRootProps,
  DropdownMenuSeparatorProps,
  DropdownMenuSubContentProps,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuTriggerProps,
  DropdownMenuTriggerRef,
};
