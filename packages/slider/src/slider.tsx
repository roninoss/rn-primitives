import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { View } from 'react-native';
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
  step: _step,
  onValueChange: _onValueChange,
  ref,
  ...props
}: RootComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <RootContext.Provider value={{ value, disabled, min, max }}>
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
type TrackComponentProps = TrackProps & React.RefAttributes<TrackRef>;

const Track = ({ asChild, ref, ...props }: TrackComponentProps) => {
  const { value, min, max, disabled } = useSliderContext();

  const Component = asChild ? Slot : View;
  return (
    <Component
      ref={ref}
      aria-disabled={disabled}
      role='slider'
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      accessibilityValue={{ max, min, now: value }}
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
  return <Component accessibilityRole='adjustable' ref={ref} {...props} />;
};

Thumb.displayName = 'ThumbNativeSlider';

export { Range, Root, Thumb, Track };
