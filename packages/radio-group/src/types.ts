import {
  ForceMountable,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rnr-method/types';

type RootProps = SlottableViewProps & {
  value: string | undefined;
  onValueChange: (val: string) => void;
  disabled?: boolean;
};

type ItemProps = SlottablePressableProps & {
  value: string;
  /**
   * nativeID of the label element that describes this radio group item
   */
  'aria-labelledby'?: string;
};

type IndicatorProps = SlottableViewProps & ForceMountable;

type RootRef = ViewRef;
type ItemRef = PressableRef;
type IndicatorRef = ViewRef;

export type { IndicatorProps, IndicatorRef, ItemProps, ItemRef, RootProps, RootRef };
