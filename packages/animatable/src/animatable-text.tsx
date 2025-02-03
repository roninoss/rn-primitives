import { Slot } from '@rn-primitives/slot';
import type { Slottable, TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Text, type TextProps } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

type AnimatedTextProps = Omit<React.ComponentPropsWithoutRef<typeof Animated.Text>, 'children'> & {
  children?: React.ReactNode | SharedValue<React.ReactNode>;
};

type AnimatableTextProps = Slottable<
  (TextProps & { isAnimated?: false }) | (AnimatedTextProps & { isAnimated: true })
>;

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

export type { AnimatableTextProps };
