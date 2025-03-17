import type {
  AndroidOnlyViewPropKeys,
  AndroidOnlyViewStyleKeys,
  IosOnlyViewPropKeys,
  IosOnlyViewStyleKeys,
  RemoveAndroidOnlyImageProps,
  RemoveAndroidOnlyTextProps,
  RemoveAndroidOnlyViewProps,
  RemoveIosOnlyImageProps,
  RemoveIosOnlyTextProps,
  RemoveIosOnlyViewProps,
  Slottable,
  TextRef,
  ViewRef,
} from '@rn-primitives/types';
import type {
  ImageProps,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextProps,
  View,
  ViewProps,
  ViewStyle,
  Image,
} from 'react-native';
import type Animated from 'react-native-reanimated';
import type { AnimatedProps, SharedValue } from 'react-native-reanimated';

type AnimatedImageProps = Slottable<React.ComponentProps<typeof Animated.Image>> & {
  ref?: React.RefObject<Animated.Image | null>;
};
type RNImageProps = Slottable<ImageProps> & { ref?: React.RefObject<Image | null> };

type AnimatableImageProps =
  | (RNImageProps & { isAnimated?: false | undefined })
  | (AnimatedImageProps & { isAnimated: true });

type AnimatableImageIosProps =
  | (RemoveAndroidOnlyImageProps<RNImageProps> & { isAnimated?: false | undefined })
  | (RemoveAndroidOnlyImageProps<AnimatedImageProps> & {
      isAnimated: true;
    });

type AnimatableImageAndroidProps =
  | (RemoveIosOnlyImageProps<RNImageProps> & { isAnimated?: false | undefined })
  | (RemoveIosOnlyImageProps<AnimatedImageProps> & {
      isAnimated: true;
    });

type AnimatablePressableRef = React.RefObject<(View & { press: () => void }) | null>;

type AnimatedPressableProps = Slottable<
  React.ComponentProps<
    React.FunctionComponent<AnimatedProps<PressableProps & React.RefAttributes<View>>>
  > & {
    key?: React.Key | null | undefined;
    ref?: AnimatablePressableRef;
  }
>;

type RNPressableProps = Slottable<PressableProps & { ref?: AnimatablePressableRef }>;

type AnimatablePressableProps =
  | (AnimatedPressableProps & { isAnimated: true })
  | (RNPressableProps & { isAnimated?: false | undefined });
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

type AnimatedTextProps = Slottable<
  Omit<React.ComponentProps<typeof Animated.Text>, 'children'> & {
    children?: React.ReactNode | SharedValue<React.ReactNode>;
  } & { ref?: React.RefObject<Animated.Text | null> }
>;

type RNTextProps = Slottable<TextProps & { ref?: TextRef }>;

type AnimatableTextProps =
  | (RNTextProps & { isAnimated?: false | undefined })
  | (AnimatedTextProps & { isAnimated: true });

type AnimatableTextIosProps =
  | (RemoveAndroidOnlyTextProps<RNTextProps> & { isAnimated?: false | undefined })
  | (RemoveAndroidOnlyTextProps<AnimatedTextProps> & { isAnimated: true });

type AnimatableTextAndroidProps =
  | (RemoveIosOnlyTextProps<RNTextProps> & { isAnimated?: false | undefined })
  | (RemoveIosOnlyTextProps<AnimatedTextProps> & { isAnimated: true });

type AnimatedViewProps = Slottable<React.ComponentProps<typeof Animated.View>> & {
  ref?: React.RefObject<Animated.View | null>;
};
type RNViewProps = Slottable<ViewProps & { ref?: ViewRef }>;

type AnimatableViewProps =
  | (RNViewProps & { isAnimated?: false | undefined })
  | (AnimatedViewProps & { isAnimated: true });
type AnimatableViewIosProps =
  | (RemoveAndroidOnlyViewProps<RNViewProps> & { isAnimated?: false | undefined })
  | (RemoveAndroidOnlyViewProps<AnimatedViewProps> & { isAnimated: true });

type AnimatableViewAndroidProps =
  | (RemoveIosOnlyViewProps<RNViewProps> & { isAnimated?: false | undefined })
  | (RemoveIosOnlyViewProps<AnimatedViewProps> & { isAnimated: true });

export type {
  AnimatableImageAndroidProps,
  AnimatableImageIosProps,
  AnimatableImageProps,
  AnimatablePressableAndroidProps,
  AnimatablePressableIosProps,
  AnimatablePressableProps,
  AnimatablePressableRef,
  AnimatableTextAndroidProps,
  AnimatableTextIosProps,
  AnimatableTextProps,
  AnimatableViewAndroidProps,
  AnimatableViewIosProps,
  AnimatableViewProps,
};
