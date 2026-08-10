import * as LabelPrimitive from '@rn-primitives/label';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Text>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Text>
>(({ style, onPress, onLongPress, onPressIn, onPressOut, ...props }, ref) => {
  const { colors } = useTheme();
  const flattenStyle = StyleSheet.flatten([styles.text, { color: colors.text }, style]);

  return (
    <LabelPrimitive.Root
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <LabelPrimitive.Text ref={ref} style={flattenStyle} {...props} />
    </LabelPrimitive.Root>
  );
});

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: Platform.OS === 'web' ? 16 : 20,
  },
});
