'use client';

import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { Image } from 'react-native';
import Animated from 'react-native-reanimated';
import type { AnimatableImageProps } from './types';

function AnimatableImage({ asChild, ...props }: AnimatableImageProps) {
  if (asChild) {
    return <Slot {...props} />;
  }
  if (props.isAnimated) {
    return <Animated.Image {...props} />;
  }
  return <Image {...props} />;
}

export { AnimatableImage };
