import { Slot } from '@rn-primitives/slot';
import type { ImageRef, Slottable } from '@rn-primitives/types';
import * as React from 'react';
import { Image, type ImageProps } from 'react-native';
import Animated from 'react-native-reanimated';

type AnimatedImageProps = React.ComponentPropsWithoutRef<typeof Animated.Image>;

type AnimatableImageProps = Slottable<
  (ImageProps & { isAnimated?: false }) | (AnimatedImageProps & { isAnimated: true })
>;

const AnimatableImage = React.forwardRef<ImageRef, AnimatableImageProps>(
  ({ asChild, ...props }, ref) => {
    if (asChild) {
      return <Slot ref={ref} {...props} />;
    }
    if (props.isAnimated) {
      return <Animated.Image ref={ref} {...props} />;
    }
    return <Image ref={ref} {...props} />;
  }
);

export { AnimatableImage };

export type { AnimatableImageProps };
