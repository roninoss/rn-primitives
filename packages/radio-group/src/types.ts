import { ForceMountable, SlottablePressableProps, SlottableViewProps } from '@rn-primitives/types';

type RadioGroupRootProps = SlottableViewProps & {
  value: string | undefined;
  onValueChange: (val: string) => void;
  disabled?: boolean;
};

type RadioGroupItemProps = SlottablePressableProps & {
  value: string;
  /**
   * nativeID of the label element that describes this radio group item
   */
  'aria-labelledby'?: string;
};

type RadioGroupIndicatorProps = SlottableViewProps & ForceMountable;

export type { RadioGroupIndicatorProps, RadioGroupItemProps, RadioGroupRootProps };
