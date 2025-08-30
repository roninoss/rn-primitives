import * as Slider from '@radix-ui/react-slider';
import * as Slot from '@rn-primitives/slot';
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

function Root({ ref, asChild, value, disabled, min, max, dir, inverted, step = 1, onValueChange, ...props  }: RootProps & { ref?: React.Ref<RootRef> }) {
    const Component = asChild ? Slot.View : View;
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

function Track({ ref, asChild, ...props  }: TrackProps & { ref?: React.Ref<TrackRef> }) {
  const Component = asChild ? Slot.View : View;
  return (
    <Slider.Track asChild>
      <Component ref={ref} {...props} />
    </Slider.Track>
  );
});

Track.displayName = 'TrackWebSlider';

function Range({ ref, asChild, ...props  }: RangeProps & { ref?: React.Ref<RangeRef> }) {
  const Component = asChild ? Slot.View : View;
  return (
    <Slider.Range asChild>
      <Component ref={ref} {...props} />
    </Slider.Range>
  );
});

Range.displayName = 'RangeWebSlider';

function Thumb({ ref, asChild, ...props  }: ThumbProps & { ref?: React.Ref<ThumbRef> }) {
  const Component = asChild ? Slot.View : View;
  return (
    <Slider.Thumb asChild>
      <Component ref={ref} {...props} />
    </Slider.Thumb>
  );
});

Thumb.displayName = 'ThumbWebSlider';

export { Range, Root, Thumb, Track };
