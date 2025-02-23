import { Slot } from '@rn-primitives/slot';
import type {
  RemoveAndroidOnlyViewProps,
  RemoveIosOnlyViewProps,
  Slottable,
  ViewRef,
} from '@rn-primitives/types';
import * as React from 'react';
import { View, type ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';

// TODO: handle web

type AnimatedViewProps = Slottable<React.ComponentPropsWithoutRef<typeof Animated.View>>;
type RNViewProps = Slottable<ViewProps>;

type AnimatableViewProps =
  | (RNViewProps & { isAnimated?: false | undefined })
  | (AnimatedViewProps & { isAnimated: true });

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

type AnimatableViewIosProps =
  | (RemoveAndroidOnlyViewProps<RNViewProps> & { isAnimated?: false | undefined })
  | (RemoveAndroidOnlyViewProps<AnimatedViewProps> & { isAnimated: true });

type AnimatableViewAndroidProps =
  | (RemoveIosOnlyViewProps<RNViewProps> & { isAnimated?: false | undefined })
  | (RemoveIosOnlyViewProps<AnimatedViewProps> & { isAnimated: true });

export { AnimatableView };

export type { AnimatableViewAndroidProps, AnimatableViewIosProps, AnimatableViewProps };
