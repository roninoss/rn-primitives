import * as NavigationMenuPrimitive from '@rn-primitives/navigation-menu';
import * as React from 'react';
import { Platform, View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  Extrapolation,
  FadeInLeft,
  FadeOutLeft,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { ChevronDown } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { ICustomTheme } from '~/lib/constants';
import { TextClassContext } from '~/components/ui/text';

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ children, style, ...props }, ref) => (
  <NavigationMenuPrimitive.Root ref={ref} style={[styles.root, style]} {...props}>
    {children}
    {Platform.OS === 'web' && <NavigationMenuViewport />}
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ style, ...props }, ref) => (
  <NavigationMenuPrimitive.List ref={ref} style={[styles.list, style]} {...props} />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = {
  flexDirection: 'row',
  height: 40,
  width: 'auto',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 6,
  paddingHorizontal: 9,
  paddingVertical: 8,
} as ViewStyle;

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> & {
    style?: StyleProp<ViewStyle>;
  }
>(({ children, disabled, style, ...props }, ref) => {
  const { value } = NavigationMenuPrimitive.useRootContext();
  const { value: itemValue } = NavigationMenuPrimitive.useItemContext();
  const { colors } = useTheme() as ICustomTheme;

  const progress = useDerivedValue(() =>
    value === itemValue ? withTiming(1, { duration: 250 }) : withTiming(0, { duration: 200 })
  );
  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
    opacity: interpolate(progress.value, [0, 1], [1, 0.8], Extrapolation.CLAMP),
  }));

  return (
    <TextClassContext.Provider value={{ fontSize: 14 }}>
      <NavigationMenuPrimitive.Trigger
        ref={ref}
        style={({ pressed }) => [
          navigationMenuTriggerStyle,
          style,
          {
            gap: 6,
            backgroundColor: value === itemValue ? colors.accent : 'transparent',
            opacity: disabled ? 0.5 : 1,
          },
          pressed && { backgroundColor: colors.accent },
        ]}
        {...props}
      >
        <>{children}</>
        <Animated.View style={chevronStyle}>
          <ChevronDown size={12} color={colors.text} aria-hidden={true} />
        </Animated.View>
      </NavigationMenuPrimitive.Trigger>
    </TextClassContext.Provider>
  );
});
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> & {
    portalHost?: string;
  }
>(({ children, portalHost, style, ...props }, ref) => {
  const { colors } = useTheme();
  const flattenContentStyles = StyleSheet.flatten([
    styles.content,
    {
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    style,
  ]);

  return (
    <NavigationMenuPrimitive.Portal hostName={portalHost}>
      <NavigationMenuPrimitive.Content ref={ref} style={flattenContentStyles} {...props}>
        <Animated.View
          entering={Platform.OS !== 'web' ? FadeInLeft : undefined}
          exiting={Platform.OS !== 'web' ? FadeOutLeft : undefined}
        >
          {children}
        </Animated.View>
      </NavigationMenuPrimitive.Content>
    </NavigationMenuPrimitive.Portal>
  );
});
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

// const NavigationMenuLink = NavigationMenuPrimitive.Link;
const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> & {
    style?: StyleProp<ViewStyle>;
  }
>(({ style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <NavigationMenuPrimitive.Link
      ref={ref}
      style={({ pressed }) => [style, pressed && { backgroundColor: colors.accent }]}
      {...props}
    />
  );
});
NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme();

  return (
    <View style={styles.viewportContainer}>
      <View
        style={[
          styles.viewport,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
          },
          style,
        ]}
        ref={ref}
        {...props}
      >
        <NavigationMenuPrimitive.Viewport />
      </View>
    </View>
  );
});
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme();

  return (
    <NavigationMenuPrimitive.Indicator ref={ref} style={[styles.indicator, style]} {...props}>
      <View style={[styles.indicatorSquare, { backgroundColor: colors.border }]} />
    </NavigationMenuPrimitive.Indicator>
  );
});
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    zIndex: 10,
    flexDirection: 'row',
    maxWidth: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  content: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  viewportContainer: {
    position: 'absolute',
    left: 0,
    top: '100%',
    justifyContent: 'center',
  },
  viewport: {
    position: 'relative',
    marginTop: 6,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 6,
    borderWidth: 1,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  indicator: {
    top: '100%',
    zIndex: 1,
    height: 6,
    alignItems: 'flex-end',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  indicatorSquare: {
    position: 'relative',
    top: '60%',
    height: 8,
    width: 8,
    transform: [{ rotate: '45deg' }],
    borderTopLeftRadius: 2,
  },
});
