import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { View, type AccessibilityActionEvent } from 'react-native';
import type {
  RangeProps,
  RangeRef,
  RootProps,
  RootRef,
  ThumbProps,
  ThumbRef,
  TrackProps,
  TrackRef,
} from './types';

const RootContext = React.createContext<RootProps | null>(null);
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  value,
  disabled,
  min,
  max,
  dir: _dir,
  inverted: _inverted,
  step,
  onValueChange,
  ref,
  ...props
}: RootComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <RootContext.Provider value={{ value, disabled, min, max, step, onValueChange }}>
      <Component ref={ref} role='group' {...props} />
    </RootContext.Provider>
  );
};

Root.displayName = 'RootNativeSlider';

function useSliderContext() {
  const context = React.useContext(RootContext);
  if (context === null) {
    throw new Error('Slider compound components cannot be rendered outside the Slider component');
  }
  return context;
}

const accessibilityActions = [{ name: 'increment' }, { name: 'decrement' }];
type TrackComponentProps = TrackProps & React.RefAttributes<TrackRef>;

const Track = ({
  asChild,
  onAccessibilityAction: onAccessibilityActionProp,
  ref,
  ...props
}: TrackComponentProps) => {
  const { value, min, max, disabled, step, onValueChange } = useSliderContext();

  function onAccessibilityAction(event: AccessibilityActionEvent) {
    if (disabled) return;
    const delta = step ?? 1;
    if (event.nativeEvent.actionName === 'increment') {
      onValueChange?.([Math.min(max ?? 100, value + delta)]);
    }
    if (event.nativeEvent.actionName === 'decrement') {
      onValueChange?.([Math.max(min ?? 0, value - delta)]);
    }
    onAccessibilityActionProp?.(event);
  }

  const Component = asChild ? Slot : View;
  return (
    <Component
      ref={ref}
      accessible={true}
      aria-disabled={disabled}
      role='slider'
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      accessibilityValue={{ max, min, now: value }}
      accessibilityState={{ disabled: disabled ?? false }}
      accessibilityActions={accessibilityActions}
      onAccessibilityAction={onAccessibilityAction}
      {...props}
    />
  );
};

Track.displayName = 'TrackNativeSlider';
type RangeComponentProps = RangeProps & React.RefAttributes<RangeRef>;

const Range = ({ asChild, ref, ...props }: RangeComponentProps) => {
  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='presentation' {...props} />;
};

Range.displayName = 'RangeNativeSlider';
type ThumbComponentProps = ThumbProps & React.RefAttributes<ThumbRef>;

const Thumb = ({ asChild, ref, ...props }: ThumbComponentProps) => {
  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='presentation' {...props} />;
};

Thumb.displayName = 'ThumbNativeSlider';

export { Range, Root, Thumb, Track };
