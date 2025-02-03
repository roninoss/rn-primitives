import { Slot } from '@rn-primitives/slot';
import type { PressableRef, Slottable } from '@rn-primitives/types';
import * as React from 'react';
import { Pressable, type PressableProps } from 'react-native';
import Animated from 'react-native-reanimated';

type AnimatedPressableProps = React.ComponentPropsWithoutRef<typeof AnimatedPressable> & {
  key?: React.Key | null | undefined;
};

type AnimatablePressableProps = Slottable<
  (PressableProps & { isAnimated?: false }) | (AnimatedPressableProps & { isAnimated: true })
>;

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

export type { AnimatablePressableProps };
