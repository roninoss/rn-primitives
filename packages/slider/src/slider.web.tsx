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
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  value,
  disabled,
  min,
  max,
  dir,
  inverted,
  step = 1,
  onValueChange,
  ref,
  ...props
}: RootComponentProps) => {
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
};

Root.displayName = 'RootWebSlider';
type TrackComponentProps = TrackProps & React.RefAttributes<TrackRef>;

const Track = ({ asChild, ref, ...props }: TrackComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <Slider.Track asChild>
      <Component ref={ref} {...props} />
    </Slider.Track>
  );
};

Track.displayName = 'TrackWebSlider';
type RangeComponentProps = RangeProps & React.RefAttributes<RangeRef>;

const Range = ({ asChild, ref, ...props }: RangeComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <Slider.Range asChild>
      <Component ref={ref} {...props} />
    </Slider.Range>
  );
};

Range.displayName = 'RangeWebSlider';
type ThumbComponentProps = ThumbProps & React.RefAttributes<ThumbRef>;

const Thumb = ({ asChild, ref, ...props }: ThumbComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <Slider.Thumb asChild>
      <Component ref={ref} {...props} />
    </Slider.Thumb>
  );
};

Thumb.displayName = 'ThumbWebSlider';

export { Range, Root, Thumb, Track };
