import * as React from 'react';
import { TextInput, StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { type ICustomTheme } from '~/lib/constants';

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ style, editable = true, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <TextInput
      ref={ref}
      style={[
        styles.base,
        {
          borderColor: colors.border,
          backgroundColor: editable ? colors.background : colors.muted,
          color: colors.text,
        },
        !editable && { opacity: 0.5 },
        style as TextStyle,
      ]}
      placeholderTextColor={colors.mutedText}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };

const styles = StyleSheet.create({
  base: {
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    lineHeight: 20,
  },
});
