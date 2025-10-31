import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { TextClassContext } from '~/components/ui/text';
import * as PopoverPrimitive from '@rn-primitives/popover';
import { useTheme } from '@react-navigation/native';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & { portalHost?: string }
>(({ align = 'center', sideOffset = 4, portalHost, style, ...props }, ref) => {
  const { colors } = useTheme();
  const flattenContentStyles = StyleSheet.flatten([
    styles.content,
    {
      backgroundColor: colors.card,
      borderColor: colors.border,
      shadowColor: colors.text,
    },
    style,
  ]);

  return (
    <PopoverPrimitive.Portal hostName={portalHost}>
      <PopoverPrimitive.Overlay style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}>
        <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut}>
          <TextClassContext.Provider value={{ color: colors.text }}>
            <PopoverPrimitive.Content
              ref={ref}
              align={align}
              sideOffset={sideOffset}
              style={flattenContentStyles}
              {...props}
            />
          </TextClassContext.Provider>
        </Animated.View>
      </PopoverPrimitive.Overlay>
    </PopoverPrimitive.Portal>
  );
});

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverContent, PopoverTrigger };

const styles = StyleSheet.create({
  content: {
    zIndex: 50,
    width: 288,
    borderRadius: 6,
    borderWidth: 1,
    padding: 16,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
