import * as SwitchPrimitives from '@rn-primitives/switch';
import * as React from 'react';
import { Platform, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { type ICustomTheme } from '~/lib/constants';

const SwitchWeb = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    style?: StyleProp<ViewStyle>;
  }
>(({ style, checked, disabled, ...props }, ref) => {
  const { colors } = useTheme();

  return (
    <SwitchPrimitives.Root
      ref={ref}
      checked={checked}
      style={[
        styles.webRoot,
        {
          backgroundColor: checked ? colors.primary : colors.border,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      {...props}
    >
      <SwitchPrimitives.Thumb
        style={[
          styles.webThumb,
          {
            backgroundColor: colors.background,
            shadowColor: colors.text,
            transform: [{ translateX: checked ? 20 : 0 }],
          },
        ]}
      />
    </SwitchPrimitives.Root>
  );
});
SwitchWeb.displayName = 'SwitchWeb';

const SwitchNative = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    style?: StyleProp<ViewStyle>;
  }
>(({ style, checked, disabled, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;
  const translateX = useDerivedValue(() => (checked ? 18 : 0));
  const animatedRootStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(translateX.value, [0, 18], [colors.muted, colors.primary]),
      opacity: disabled ? 0.5 : 1,
    };
  });

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(translateX.value, { duration: 200 }) }],
  }));

  return (
    <Animated.View style={[styles.nativeRoot, animatedRootStyle, style]}>
      <SwitchPrimitives.Root
        ref={ref}
        checked={checked}
        style={[
          styles.nativeInnerRoot,
          { backgroundColor: checked ? colors.primary : colors.border },
        ]}
        {...props}
      >
        <Animated.View style={animatedThumbStyle}>
          <SwitchPrimitives.Thumb
            style={[
              styles.nativeThumb,
              { backgroundColor: colors.background, shadowColor: colors.text },
            ]}
          />
        </Animated.View>
      </SwitchPrimitives.Root>
    </Animated.View>
  );
});
SwitchNative.displayName = 'SwitchNative';

const Switch = Platform.select({
  web: SwitchWeb,
  default: SwitchNative,
});

export { Switch };

const styles = StyleSheet.create({
  webRoot: {
    flexDirection: 'row',
    height: 24,
    width: 44,
    flexShrink: 0,
    cursor: 'pointer',
    alignItems: 'center',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  webThumb: {
    pointerEvents: 'none',
    height: 20,
    width: 20,
    borderRadius: 9999,
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  nativeRoot: {
    height: 28,
    width: 46,
    borderRadius: 9999,
  },
  nativeInnerRoot: {
    flexDirection: 'row',
    height: 28,
    width: 46,
    flexShrink: 0,
    alignItems: 'center',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  nativeThumb: {
    height: 24,
    width: 24,
    borderRadius: 9999,
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
});
