import { Slot } from '@rn-primitives/slot';
import type { ViewRef } from '@rn-primitives/types';
import * as React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import type { AnimatableViewProps } from './types';

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
