import { Slot } from '@rn-primitives/slot';
import type {
  AndroidOnlyViewPropKeys,
  AndroidOnlyViewStyleKeys,
  IosOnlyViewPropKeys,
  IosOnlyViewStyleKeys,
  PressableRef,
  Slottable,
} from '@rn-primitives/types';
import * as React from 'react';
import {
  Pressable,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

type AnimatedPressableProps = Slottable<
  React.ComponentPropsWithoutRef<typeof AnimatedPressable> & {
    key?: React.Key | null | undefined;
  }
>;

type RNPressableProps = Slottable<PressableProps>;

type AnimatablePressableProps =
  | (AnimatedPressableProps & { isAnimated: true })
  | (RNPressableProps & { isAnimated?: false | undefined });

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

type AnimatedPressableStyle = AnimatedPressableProps['style'];
type AnimatedPressableCbStyle = Exclude<AnimatedPressableStyle, StyleProp<ViewStyle>>;

type AnimatedPressableIosProps = Omit<AnimatedPressableProps, AndroidOnlyViewPropKeys | 'style'> & {
  style?: AnimatedPressableStyle extends AnimatedPressableCbStyle
    ? (state: PressableStateCallbackType) => Omit<AnimatedPressableStyle, AndroidOnlyViewStyleKeys>
    : AnimatedPressableStyle;
};

type RNPressableStyle = RNPressableProps['style'];
type RNPressableCbStyle = Exclude<RNPressableStyle, StyleProp<ViewStyle>>;

type RNPressableIosProps = Omit<RNPressableProps, AndroidOnlyViewPropKeys | 'style'> & {
  style?: RNPressableStyle extends RNPressableCbStyle
    ? (state: PressableStateCallbackType) => Omit<RNPressableStyle, IosOnlyViewStyleKeys>
    : RNPressableStyle;
};

type AnimatablePressableIosProps =
  | (AnimatedPressableIosProps & { isAnimated: true })
  | (RNPressableIosProps & { isAnimated?: false | undefined });

type AnimatedPressableAndroidProps = Omit<AnimatedPressableProps, IosOnlyViewPropKeys | 'style'> & {
  style?: AnimatedPressableStyle extends AnimatedPressableCbStyle
    ? (state: PressableStateCallbackType) => Omit<AnimatedPressableStyle, IosOnlyViewStyleKeys>
    : AnimatedPressableStyle;
};

type RNPressableAndroidProps = Omit<RNPressableProps, IosOnlyViewPropKeys | 'style'> & {
  style?: RNPressableStyle extends RNPressableCbStyle
    ? (state: PressableStateCallbackType) => Omit<RNPressableStyle, IosOnlyViewStyleKeys>
    : RNPressableStyle;
};

type AnimatablePressableAndroidProps =
  | (AnimatedPressableAndroidProps & { isAnimated: true })
  | (RNPressableAndroidProps & { isAnimated?: false | undefined });

export { AnimatablePressable };

export type {
  AnimatablePressableAndroidProps,
  AnimatablePressableIosProps,
  AnimatablePressableProps,
};
