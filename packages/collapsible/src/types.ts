import type {
  ForceMountable,
  SlottablePressableProps,
  SlottableViewProps,
} from '@rn-primitives/types';

interface RootContext {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled: boolean;
}

type CollapsibleRootProps = SlottableViewProps & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
};

type CollapsibleTriggerProps = SlottablePressableProps;
type CollapsibleContentProps = ForceMountable & SlottableViewProps;

export type { CollapsibleContentProps, CollapsibleRootProps, CollapsibleTriggerProps, RootContext };
