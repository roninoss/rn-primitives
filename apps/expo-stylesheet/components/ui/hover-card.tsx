import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { TextClassContext } from '~/components/ui/text';
import * as HoverCardPrimitive from '@rn-primitives/hover-card';
import { useTheme } from '@react-navigation/native';

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ align = 'center', sideOffset = 4, style, ...props }, ref) => {
  const { colors } = useTheme();
  const flattenContentStyles = StyleSheet.flatten([
    styles.base,
    {
      borderColor: colors.border,
      backgroundColor: colors.card,
      shadowColor: colors.text,
    },
    style,
  ]);

  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Overlay
        style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}
      >
        <Animated.View entering={FadeIn}>
          <TextClassContext.Provider value={{ color: colors.text }}>
            <HoverCardPrimitive.Content
              ref={ref}
              align={align}
              sideOffset={sideOffset}
              style={flattenContentStyles}
              {...props}
            />
          </TextClassContext.Provider>
        </Animated.View>
      </HoverCardPrimitive.Overlay>
    </HoverCardPrimitive.Portal>
  );
});
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardContent, HoverCardTrigger };

const styles = StyleSheet.create({
  base: {
    zIndex: 50,
    width: 256,
    borderRadius: 6,
    borderWidth: 1,
    padding: 16,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
