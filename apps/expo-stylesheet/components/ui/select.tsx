import * as SelectPrimitive from '@rn-primitives/select';
import * as React from 'react';
import { Platform, View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { Check, ChevronDown, ChevronUp } from 'lucide-react-native';
import { ICustomTheme } from '~/lib/constants';

type Option = SelectPrimitive.Option;

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ children, style, disabled, ...props }, ref) => {
  const { colors } = useTheme();

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      style={[
        styles.trigger,
        { backgroundColor: colors.card, borderColor: colors.border },
        disabled && { opacity: 0.5 },
        style as StyleProp<ViewStyle>,
      ]}
      {...props}
    >
      <>{children}</>
      <ChevronDown size={16} aria-hidden={true} color={colors.text} style={{ opacity: 0.7 }} />
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

/**
 * Platform: WEB ONLY
 */
const SelectScrollUpButton = (
  props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
) => {
  const { colors } = useTheme();
  if (Platform.OS !== 'web') return null;

  return (
    <SelectPrimitive.ScrollUpButton style={styles.scrollButton} {...props}>
      <ChevronUp size={14} color={colors.text} />
    </SelectPrimitive.ScrollUpButton>
  );
};

/**
 * Platform: WEB ONLY
 */
const SelectScrollDownButton = (
  props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
) => {
  const { colors } = useTheme();
  if (Platform.OS !== 'web') return null;
  return (
    <SelectPrimitive.ScrollDownButton style={styles.scrollButton} {...props}>
      <ChevronDown size={14} color={colors.text} />
    </SelectPrimitive.ScrollDownButton>
  );
};

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    portalHost?: string;
  }
>(({ children, position = 'popper', portalHost, style, ...props }, ref) => {
  // const { open } = SelectPrimitive.useRootContext();
  const { colors } = useTheme();
  const flattenStyles = StyleSheet.flatten([
    styles.content,
    {
      backgroundColor: colors.card,
      borderColor: colors.border,
      shadowColor: colors.text,
    },
    style,
  ]); // single style object

  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <SelectPrimitive.Overlay
        style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.2)' }]}
      >
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <SelectPrimitive.Content ref={ref} style={flattenStyles} position={position} {...props}>
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport style={styles.viewport}>{children}</SelectPrimitive.Viewport>
            <SelectScrollDownButton />
          </SelectPrimitive.Content>
        </Animated.View>
      </SelectPrimitive.Overlay>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme();

  return (
    <SelectPrimitive.Label
      ref={ref}
      style={[styles.label, { color: colors.text }, style]}
      {...props}
    />
  );
});
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, disabled, style, ...props }, ref) => {
  const { colors } = useTheme();

  return (
    <SelectPrimitive.Item
      ref={ref}
      style={[styles.item, disabled && { opacity: 0.5 }, style as StyleProp<ViewStyle>]}
      {...props}
    >
      <View style={styles.itemIndicatorWrapper}>
        <SelectPrimitive.ItemIndicator>
          <Check size={16} strokeWidth={3} color={colors.text} />
        </SelectPrimitive.ItemIndicator>
      </View>
      <SelectPrimitive.ItemText style={[styles.itemText, { color: colors.text }]} />
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <SelectPrimitive.Separator
      ref={ref}
      style={[styles.separator, { backgroundColor: colors.muted }, style]}
      {...props}
    />
  );
});
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  scrollButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  content: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 4,
    maxHeight: 300,
    minWidth: 120,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  viewport: {
    padding: 4,
  },
  label: {
    paddingVertical: 6,
    paddingBottom: 8,
    paddingLeft: 40,
    paddingRight: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  item: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 40,
    paddingRight: 8,
    borderRadius: 6,
  },
  itemIndicatorWrapper: {
    position: 'absolute',
    left: 14,
    height: 14,
    width: 14,
    paddingTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    marginVertical: 8,
  },
});

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type Option,
};
