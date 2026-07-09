import * as TooltipPrimitive from '@rn-primitives/tooltip';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { TextClassContext } from '~/components/ui/text';
import { useTheme } from '@react-navigation/native';

const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    portalHost?: string;
  }
>(({ sideOffset = 4, portalHost, style, ...props }, ref) => {
  const { colors } = useTheme();
  const flattenContentStyles = StyleSheet.flatten([
    styles.content,
    {
      borderColor: colors.border,
      backgroundColor: colors.card,
      shadowColor: colors.text,
    },
    style,
  ]);

  return (
    <TooltipPrimitive.Portal hostName={portalHost}>
      <TooltipPrimitive.Overlay style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}>
        <Animated.View
          entering={Platform.select({ web: undefined, default: FadeIn })}
          exiting={Platform.select({ web: undefined, default: FadeOut })}
        >
          <TextClassContext.Provider value={{ fontSize: 14 }}>
            <TooltipPrimitive.Content
              ref={ref}
              sideOffset={sideOffset}
              style={flattenContentStyles}
              {...props}
            />
          </TextClassContext.Provider>
        </Animated.View>
      </TooltipPrimitive.Overlay>
    </TooltipPrimitive.Portal>
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipTrigger };

const styles = StyleSheet.create({
  content: {
    zIndex: 50,
    overflow: 'hidden',
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
