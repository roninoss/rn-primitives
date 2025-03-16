'use client';

import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { Text } from 'react-native';
import Animated from 'react-native-reanimated';
import type { AnimatableTextProps } from './types';

function AnimatableText({ asChild, ...props }: AnimatableTextProps) {
  if (asChild) {
    return <Slot {...props} />;
  }
  if (props.isAnimated) {
    return <Animated.Text {...props} />;
  }
  return <Text {...props} />;
}

export { AnimatableText };
