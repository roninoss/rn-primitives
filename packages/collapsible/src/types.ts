import type {
  ForceMountable,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rn-primitives/types';

interface RootContext {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled: boolean;
}

type RootProps = SlottableViewProps & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
};

type TriggerProps = SlottablePressableProps;
type ContentProps = ForceMountable & SlottableViewProps;

type RootRef = ViewRef;
type TriggerRef = PressableRef;
type ContentRef = ViewRef;

export type { ContentProps, ContentRef, RootContext, RootProps, RootRef, TriggerProps, TriggerRef };
