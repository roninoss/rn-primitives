import type {
  ForceMountable,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rn-primitives/types';

type RootProps = SlottablePressableProps & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
};

type IndicatorProps = ForceMountable & SlottableViewProps;

type RootRef = PressableRef;
type IndicatorRef = ViewRef;

export type { IndicatorProps, IndicatorRef, RootProps, RootRef };
