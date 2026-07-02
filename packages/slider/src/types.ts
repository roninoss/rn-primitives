import type { SlottableViewProps, ViewRef } from '@rn-primitives/types';

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
   * On native, used as the increment/decrement amount for screen reader adjustments.
   */
  step?: number;
  /**
   * On native, called when a screen reader performs an increment/decrement action.
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
