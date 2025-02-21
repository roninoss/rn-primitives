import { Slot } from '@rn-primitives/slot';
import type {
  ImageRef,
  RemoveAndroidOnlyImageProps,
  RemoveIosOnlyImageProps,
  Slottable,
} from '@rn-primitives/types';
import * as React from 'react';
import { Image, type ImageProps } from 'react-native';
import Animated from 'react-native-reanimated';

type AnimatedImageProps = Slottable<React.ComponentPropsWithoutRef<typeof Animated.Image>>;
type RNImageProps = Slottable<ImageProps>;

type AnimatableImageProps =
  | (RNImageProps & { isAnimated?: false | undefined })
  | (AnimatedImageProps & { isAnimated: true });

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

type AnimatableImageIosProps =
  | (RemoveAndroidOnlyImageProps<RNImageProps> & { isAnimated?: false | undefined })
  | (RemoveAndroidOnlyImageProps<AnimatedImageProps> & { isAnimated: true });

type AnimatableImageAndroidProps =
  | (RemoveIosOnlyImageProps<RNImageProps> & { isAnimated?: false | undefined })
  | (RemoveIosOnlyImageProps<AnimatedImageProps> & { isAnimated: true });

export { AnimatableImage };

export type { AnimatableImageAndroidProps, AnimatableImageIosProps, AnimatableImageProps };
