'use client';

import { Slot } from '@rn-primitives/slot';
import type { TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Text } from 'react-native';
import Animated from 'react-native-reanimated';
import type { AnimatableTextProps } from './types';

const AnimatableText = React.forwardRef<TextRef, AnimatableTextProps>(
  ({ asChild, ...props }, ref) => {
    if (asChild) {
      return <Slot ref={ref} {...props} />;
    }
    if (props.isAnimated) {
      return <Animated.Text ref={ref} {...props} />;
    }
    return <Text ref={ref} {...props} />;
  }
);

export { AnimatableText };
