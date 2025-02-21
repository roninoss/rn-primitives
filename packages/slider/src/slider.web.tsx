import * as Slider from '@radix-ui/react-slider';
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

const Root = React.forwardRef<RootRef, RootProps>(
  (
    { asChild, value, disabled, min, max, dir, inverted, step = 1, onValueChange, ...props },
    ref
  ) => {
    const Component = asChild ? Slot : View;
    return (
      <Slider.Root
        dir={dir}
        inverted={inverted}
        value={[value]}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        onValueChange={onValueChange}
        asChild
      >
        <Component ref={ref} {...props} />
      </Slider.Root>
    );
  }
);

Root.displayName = 'RootWebSlider';

const Track = React.forwardRef<TrackRef, TrackProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot : View;
  return (
    <Slider.Track asChild>
      <Component ref={ref} {...props} />
    </Slider.Track>
  );
});

Track.displayName = 'TrackWebSlider';

const Range = React.forwardRef<RangeRef, RangeProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot : View;
  return (
    <Slider.Range asChild>
      <Component ref={ref} {...props} />
    </Slider.Range>
  );
});

Range.displayName = 'RangeWebSlider';

const Thumb = React.forwardRef<ThumbRef, ThumbProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot : View;
  return (
    <Slider.Thumb asChild>
      <Component ref={ref} {...props} />
    </Slider.Thumb>
  );
});

Thumb.displayName = 'ThumbWebSlider';

export { Range, Root, Thumb, Track };
