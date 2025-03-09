'use client';

import { Slot } from '@rn-primitives/slot';
import type { ImageRef } from '@rn-primitives/types';
import * as React from 'react';
import { Image } from 'react-native';
import Animated from 'react-native-reanimated';
import type { AnimatableImageProps } from './types';

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
