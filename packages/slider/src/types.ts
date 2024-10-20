import type { SlottableViewProps } from '@rn-primitives/types';

type SliderRootProps = SlottableViewProps & {
  value: number;
  disabled?: boolean;
  min?: number;
  max?: number;
  /**
   * Platform: WEB ONLY
   */
  dir?: 'ltr' | 'rtl';
  /**
   * Platform: WEB ONLY
   */
  inverted?: boolean;
  /**
   * Platform: WEB ONLY
   */
  step?: number;
  /**
   * Platform: WEB ONLY
   */
  onValueChange?: (value: number[]) => void;
};

type SliderTrackProps = SlottableViewProps;
type SliderRangeProps = SlottableViewProps;
type SliderThumbProps = SlottableViewProps;

export type { SliderRangeProps, SliderRootProps, SliderThumbProps, SliderTrackProps };
