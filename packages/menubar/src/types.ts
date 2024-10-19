import {
  ForceMountable,
  PositionedContentProps,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
} from '@rn-primitives/types';

type MenubarRootProps = SlottableViewProps & {
  value: string | undefined;
  onValueChange: (value: string | undefined) => void;
};

type MenubarMenuProps = SlottableViewProps & {
  value: string | undefined;
};

interface MenubarPortalProps extends ForceMountable {
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

type MenubarOverlayProps = ForceMountable &
  SlottablePressableProps & {
    closeOnPress?: boolean;
  };

type MenubarItemProps = SlottablePressableProps & {
  textValue?: string;
  closeOnPress?: boolean;
};

type MenubarCheckboxItemProps = SlottablePressableProps & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  closeOnPress?: boolean;
  textValue?: string;
};

type MenubarRadioGroupProps = SlottableViewProps & {
  value: string | undefined;
  onValueChange: (value: string) => void;
};

type MenubarRadioItemProps = SlottablePressableProps & {
  value: string;
  textValue?: string;
  closeOnPress?: boolean;
};

type MenubarSeparatorProps = SlottableViewProps & {
  decorative?: boolean;
};

type MenubarSubProps = SlottableViewProps & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
};

type MenubarSubTriggerProps = SlottablePressableProps & {
  textValue?: string;
};

type MenubarTriggerProps = SlottablePressableProps;
type MenubarContentProps = SlottableViewProps & PositionedContentProps;
type MenubarSubContentProps = SlottableViewProps & ForceMountable;
type MenubarItemIndicatorProps = SlottableViewProps & ForceMountable;
type MenubarGroupProps = SlottableViewProps;
type MenubarLabelProps = SlottableTextProps;

export type {
  MenubarCheckboxItemProps,
  MenubarContentProps,
  MenubarGroupProps,
  MenubarItemIndicatorProps,
  MenubarItemProps,
  MenubarLabelProps,
  MenubarMenuProps,
  MenubarOverlayProps,
  MenubarPortalProps,
  MenubarRadioGroupProps,
  MenubarRadioItemProps,
  MenubarRootProps,
  MenubarSeparatorProps,
  MenubarSubContentProps,
  MenubarSubProps,
  MenubarSubTriggerProps,
  MenubarTriggerProps,
};
