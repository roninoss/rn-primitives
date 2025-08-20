import * as AccordionPrimitive from '@rn-primitives/accordion';
import * as React from 'react';
import { Platform, Pressable, View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOutUp,
  LayoutAnimationConfig,
  LinearTransition,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { ChevronDown } from 'lucide-react-native';
import { TextClassContext } from '~/components/ui/text';

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ children, ...props }, ref) => {
  return (
    <LayoutAnimationConfig skipEntering>
      <AccordionPrimitive.Root ref={ref} {...props} asChild={Platform.OS !== 'web'}>
        <Animated.View layout={LinearTransition.duration(200)}>{children}</Animated.View>
      </AccordionPrimitive.Root>
    </LayoutAnimationConfig>
  );
});

Accordion.displayName = AccordionPrimitive.Root.displayName;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ value, style, ...props }, ref) => {
  const { colors } = useTheme();

  return (
    <Animated.View style={styles.overflowHidden} layout={LinearTransition.duration(200)}>
      <AccordionPrimitive.Item
        ref={ref}
        value={value}
        {...props}
        style={[styles.item, { borderBottomColor: colors.border }, style]}
      />
    </Animated.View>
  );
});
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

const Trigger = Platform.OS === 'web' ? View : Pressable;

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ children, style, ...props }, ref) => {
  const { isExpanded } = AccordionPrimitive.useItemContext();
  const { colors } = useTheme();

  const progress = useDerivedValue(() =>
    isExpanded ? withTiming(1, { duration: 250 }) : withTiming(0, { duration: 200 })
  );

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
    opacity: interpolate(progress.value, [0, 1], [1, 0.8], Extrapolation.CLAMP),
  }));

  return (
    <TextClassContext.Provider value={styles.triggerProvider}>
      <AccordionPrimitive.Header style={styles.triggerHeader}>
        <AccordionPrimitive.Trigger ref={ref} {...props} asChild>
          <Trigger
            style={[styles.trigger, { borderColor: colors.border }, style as StyleProp<ViewStyle>]}
          >
            <>{children}</>
            <Animated.View style={chevronStyle}>
              <ChevronDown size={18} color={colors.text} />
            </Animated.View>
          </Trigger>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    </TextClassContext.Provider>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, style, ...props }, ref) => (
  <TextClassContext.Provider value={styles.contentProvider}>
    <AccordionPrimitive.Content ref={ref} {...props} style={styles.content}>
      <InnerContent style={[styles.innerContent, style]}>{children}</InnerContent>
    </AccordionPrimitive.Content>
  </TextClassContext.Provider>
));

function InnerContent({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  if (Platform.OS === 'web') {
    return <View style={[styles.innerContent, style]}>{children}</View>;
  }

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOutUp.duration(200)}
      style={[styles.innerContent, style]}
    >
      {children}
    </Animated.View>
  );
}

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };

const styles = StyleSheet.create({
  overflowHidden: {
    overflow: 'hidden',
  },
  item: {
    borderBottomWidth: 1,
  },
  triggerProvider: {
    fontSize: 16,
    // lineHeight: 28,
    fontWeight: 500,
  },
  triggerHeader: {
    display: 'flex',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  contentProvider: {
    fontSize: 16,
    lineHeight: 24,
  },
  content: {
    overflow: 'hidden',
    fontSize: 14,
  },
  innerContent: {
    paddingBottom: 16,
  },
});
