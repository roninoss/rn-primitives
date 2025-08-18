import * as React from 'react';
import { TextInput, StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { type ICustomTheme } from '~/lib/constants';

type InputProps = React.ComponentPropsWithoutRef<typeof TextInput> & {
  placeholderClassName?: string; // kept in case you use it elsewhere
};

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ style, placeholderClassName, editable = true, ...props }, ref) => {
    const { colors } = useTheme() as ICustomTheme;

    return (
      <TextInput
        ref={ref}
        editable={editable}
        style={[
          styles.base,
          {
            backgroundColor: editable ? colors.background : colors.muted,
            borderColor: colors.border,
            color: colors.text,
          },
          !editable && { opacity: 0.5 },
          style as TextStyle,
        ]}
        placeholderTextColor={colors.mutedText}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };

const styles = StyleSheet.create({
  base: {
    height: 44,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16, // native:text-lg
    lineHeight: 20,
  },
});
