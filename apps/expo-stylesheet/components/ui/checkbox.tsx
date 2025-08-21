import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import * as React from 'react';
import { Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Check } from 'lucide-react-native';
import { ICustomTheme } from '~/lib/constants';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ style, checked, disabled, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      checked={checked}
      style={[
        styles.base,
        {
          borderColor: colors.primary,
          backgroundColor: checked ? colors.primary : colors.background,
          opacity: disabled ? 0.5 : 1,
        },
        style as StyleProp<ViewStyle>,
      ]}
      {...props}
    >
      <CheckboxPrimitive.Indicator style={styles.indicator}>
        <Check
          size={12}
          strokeWidth={Platform.OS === 'web' ? 2.5 : 3.5}
          color={colors.buttonPrimaryText}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

const styles = StyleSheet.create({
  base: {
    height: 16,
    width: 16,
    flexShrink: 0,
    borderRadius: 2,
    borderWidth: 1,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
});
