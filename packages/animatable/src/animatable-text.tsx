import { Slot } from '@rn-primitives/slot';
import type {
  RemoveAndroidOnlyTextProps,
  RemoveIosOnlyTextProps,
  Slottable,
  TextRef,
} from '@rn-primitives/types';
import * as React from 'react';
import { Text, type TextProps } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

// TODO: handle web
type AnimatedTextProps = Slottable<
  Omit<React.ComponentPropsWithoutRef<typeof Animated.Text>, 'children'> & {
    children?: React.ReactNode | SharedValue<React.ReactNode>;
  }
>;
type RNTextProps = Slottable<TextProps>;

type AnimatableTextProps =
  | (RNTextProps & { isAnimated?: false | undefined })
  | (AnimatedTextProps & { isAnimated: true });

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

type AnimatableTextIosProps =
  | (RemoveAndroidOnlyTextProps<RNTextProps> & { isAnimated?: false | undefined })
  | (RemoveAndroidOnlyTextProps<AnimatedTextProps> & { isAnimated: true });

type AnimatableTextAndroidProps =
  | (RemoveIosOnlyTextProps<RNTextProps> & { isAnimated?: false | undefined })
  | (RemoveIosOnlyTextProps<AnimatedTextProps> & { isAnimated: true });

export { AnimatableText };

export type { AnimatableTextAndroidProps, AnimatableTextIosProps, AnimatableTextProps };
