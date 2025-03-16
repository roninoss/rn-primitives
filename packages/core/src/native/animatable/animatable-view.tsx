'use client';

import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import type { AnimatableViewProps } from './types';

const AnimatableView = ({ asChild, ...props }: AnimatableViewProps) => {
  if (asChild) {
    return <Slot {...props} />;
  }
  if (props.isAnimated) {
    return <Animated.View {...props} />;
  }
  return <View {...props} />;
};

export { AnimatableView };
