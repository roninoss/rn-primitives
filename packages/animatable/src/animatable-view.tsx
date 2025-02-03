import { Slot } from '@rn-primitives/slot';
import type { Slottable, ViewRef } from '@rn-primitives/types';
import * as React from 'react';
import { View, type ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';

type AnimatedViewProps = React.ComponentPropsWithoutRef<typeof Animated.View>;

type AnimatableViewProps = Slottable<
  (ViewProps & { isAnimated?: false }) | (AnimatedViewProps & { isAnimated: true })
>;

const AnimatableView = React.forwardRef<ViewRef, AnimatableViewProps>(
  ({ asChild, ...props }, ref) => {
    if (asChild) {
      return <Slot ref={ref} {...props} />;
    }
    if (props.isAnimated) {
      return <Animated.View ref={ref} {...props} />;
    }
    return <View ref={ref} {...props} />;
  }
);

AnimatableView.displayName = 'AnimatableView';

export { AnimatableView };

export type { AnimatableViewProps };
