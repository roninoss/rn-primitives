import type { SlottableViewProps, ViewRef } from '@rnr-method/types';

type RootProps = SlottableViewProps & {
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

type TrackProps = SlottableViewProps;
type RangeProps = SlottableViewProps;
type ThumbProps = SlottableViewProps;

type RootRef = ViewRef;
type TrackRef = ViewRef;
type RangeRef = ViewRef;
type ThumbRef = ViewRef;

export type {
  RangeProps,
  RangeRef,
  RootProps,
  RootRef,
  ThumbProps,
  ThumbRef,
  TrackProps,
  TrackRef,
};
