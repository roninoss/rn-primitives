import {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '@rnr-method/types';

type RootProps = SlottableViewProps & {
  value: string | undefined;
  onValueChange: (value: string | undefined) => void;
};

type MenuProps = SlottableViewProps & {
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

type OverlayProps = ForceMountable &
  SlottablePressableProps & {
    closeOnPress?: boolean;
  };

type ItemProps = SlottablePressableProps & {
  textValue?: string;
  closeOnPress?: boolean;
};

type CheckboxItemProps = SlottablePressableProps & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  closeOnPress?: boolean;
  textValue?: string;
};

type RadioGroupProps = SlottableViewProps & {
  value: string | undefined;
  onValueChange: (value: string) => void;
};

type RadioItemProps = SlottablePressableProps & {
  value: string;
  textValue?: string;
  closeOnPress?: boolean;
};

type SeparatorProps = SlottableViewProps & {
  decorative?: boolean;
};

type SubProps = SlottableViewProps & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
};

type SubTriggerProps = SlottablePressableProps & {
  textValue?: string;
};

type TriggerProps = SlottablePressableProps;
type ContentProps = SlottableViewProps & PositionedContentProps;
type SubContentProps = SlottableViewProps & ForceMountable;
type ItemIndicatorProps = SlottableViewProps & ForceMountable;
type GroupProps = SlottableViewProps;
type LabelProps = SlottableTextProps;

type CheckboxItemRef = PressableRef;
type ContentRef = ViewRef;
type GroupRef = ViewRef;
type ItemIndicatorRef = ViewRef;
type ItemRef = PressableRef;
type LabelRef = TextRef;
type MenuRef = ViewRef;
type OverlayRef = PressableRef;
type RadioGroupRef = ViewRef;
type RadioItemRef = PressableRef;
type RootRef = ViewRef;
type SeparatorRef = ViewRef;
type SubContentRef = ViewRef;
type SubRef = ViewRef;
type SubTriggerRef = PressableRef;
type TriggerRef = PressableRef;

export type {
  CheckboxItemProps,
  CheckboxItemRef,
  ContentProps,
  ContentRef,
  GroupProps,
  GroupRef,
  ItemIndicatorProps,
  ItemIndicatorRef,
  ItemProps,
  ItemRef,
  LabelProps,
  LabelRef,
  MenuProps,
  MenuRef,
  OverlayProps,
  OverlayRef,
  PortalProps,
  RadioGroupProps,
  RadioGroupRef,
  RadioItemProps,
  RadioItemRef,
  RootProps,
  RootRef,
  SeparatorProps,
  SeparatorRef,
  SubContentProps,
  SubContentRef,
  SubProps,
  SubRef,
  SubTriggerProps,
  SubTriggerRef,
  TriggerProps,
  TriggerRef,
};
