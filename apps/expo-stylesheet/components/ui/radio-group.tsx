import * as React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import * as RadioGroupPrimitive from '@rn-primitives/radio-group';
import { useTheme } from '@react-navigation/native';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ style, ...props }, ref) => {
  const flattenStyle = StyleSheet.flatten([styles.group, style]);

  return <RadioGroupPrimitive.Root ref={ref} style={flattenStyle} {...props} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    style?: StyleProp<ViewStyle>;
  }
>(({ style, disabled, ...props }, ref) => {
  const { colors } = useTheme();
  const flattenRadioItemStyle = StyleSheet.flatten([
    styles.item,
    {
      borderColor: colors.primary,
      opacity: disabled ? 0.5 : 1,
    },
    style,
  ]);

  return (
    <RadioGroupPrimitive.Item ref={ref} style={flattenRadioItemStyle} {...props}>
      <RadioGroupPrimitive.Indicator style={styles.indicatorWrapper}>
        <View style={[styles.indicator, { backgroundColor: colors.primary }]} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };

const styles = StyleSheet.create({
  group: {
    flexDirection: 'column',
    gap: 8,
  },
  item: {
    aspectRatio: 1,
    height: 16,
    width: 16,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  indicatorWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    aspectRatio: 1,
    height: 9,
    width: 9,
    borderRadius: 9999,
  },
});
