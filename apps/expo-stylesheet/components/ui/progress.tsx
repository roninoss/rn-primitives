import * as ProgressPrimitive from '@rn-primitives/progress';
import * as React from 'react';
import { Platform, View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { type ICustomTheme } from '~/lib/constants';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorStyle?: ViewStyle;
  }
>(({ style, value, indicatorStyle, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;
  const flattenStyle = StyleSheet.flatten([styles.root, { backgroundColor: colors.accent }, style]);

  return (
    <ProgressPrimitive.Root ref={ref} {...props} style={flattenStyle}>
      <Indicator value={value} indicatorStyle={indicatorStyle} />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

function Indicator({
  value,
  indicatorStyle,
}: {
  value: number | undefined | null;
  indicatorStyle?: ViewStyle;
}) {
  const { colors } = useTheme();
  const progress = useDerivedValue(() => value ?? 0);
  const flattenWebIndicatorStyle = StyleSheet.flatten([styles.webIndicator, indicatorStyle]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(
        `${interpolate(progress.value, [0, 100], [1, 100], Extrapolation.CLAMP)}%`,
        { overshootClamping: true }
      ),
      height: '100%',
      backgroundColor: colors.primary,
      ...indicatorStyle,
    };
  });

  if (Platform.OS === 'web') {
    return (
      <View
        style={[
          styles.webIndicator,
          { backgroundColor: colors.primary, transform: `translateX(-${100 - (value ?? 0)}%)` },
          indicatorStyle,
        ]}
      >
        <ProgressPrimitive.Indicator style={flattenWebIndicatorStyle} />
      </View>
    );
  }

  return (
    <ProgressPrimitive.Indicator asChild>
      <Animated.View style={animatedStyle} />
    </ProgressPrimitive.Indicator>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    height: Platform.OS === 'web' ? 16 : 14,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 9999,
  },
  webIndicator: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
});
