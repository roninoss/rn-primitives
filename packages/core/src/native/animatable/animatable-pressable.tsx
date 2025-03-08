import { Slot } from '@rn-primitives/slot';
import type { PressableRef } from '@rn-primitives/types';
import * as React from 'react';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import type { AnimatablePressableProps } from './types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnimatablePressable = React.forwardRef<PressableRef, AnimatablePressableProps>(
  ({ asChild, ...props }, ref) => {
    if (asChild) {
      return <Slot ref={ref} {...props} />;
    }
    if (props.isAnimated) {
      return <AnimatedPressable ref={ref} {...props} />;
    }
    return <Pressable ref={ref} {...props} />;
  }
);

AnimatablePressable.displayName = 'AnimatablePressable';

export { AnimatablePressable };
