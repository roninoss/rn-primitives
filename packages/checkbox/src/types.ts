import type {
  ForceMountable,
  SlottablePressableProps,
  SlottableViewProps,
} from '@rn-primitives/types';

type CheckboxRootProps = SlottablePressableProps & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
};

type CheckboxIndicatorProps = ForceMountable & SlottableViewProps;

export type { CheckboxIndicatorProps, CheckboxRootProps };
