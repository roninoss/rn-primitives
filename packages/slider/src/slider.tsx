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

const Root = (
  {
    ref,
    asChild,
    value,
    disabled,
    min,
    max,
    dir: _dir,
    inverted: _inverted,
    step: _step,
    onValueChange: _onValueChange,
    ...props
  }: RootProps & {
    ref: React.RefObject<RootRef>;
  }
) => {
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

const Track = (
  {
    ref,
    asChild,
    ...props
  }: TrackProps & {
    ref: React.RefObject<TrackRef>;
  }
) => {
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

const Range = (
  {
    ref,
    asChild,
    ...props
  }: RangeProps & {
    ref: React.RefObject<RangeRef>;
  }
) => {
  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='presentation' {...props} />;
};

Range.displayName = 'RangeNativeSlider';

const Thumb = (
  {
    ref,
    asChild,
    ...props
  }: ThumbProps & {
    ref: React.RefObject<ThumbRef>;
  }
) => {
  const Component = asChild ? Slot : View;
  return <Component accessibilityRole='adjustable' ref={ref} {...props} />;
};

Thumb.displayName = 'ThumbNativeSlider';

export { Range, Root, Thumb, Track };
