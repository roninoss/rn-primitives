import { useTheme } from '@react-navigation/native';
import * as Slot from '@rn-primitives/slot';
import type { SlottableTextProps, TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { type ICustomTheme } from '~/lib/constants';

const TextClassContext = React.createContext<TextStyle | TextStyle[] | undefined>(undefined);

const Text = React.forwardRef<TextRef, SlottableTextProps>(
  ({ asChild = false, style, ...props }, ref) => {
    const { colors } = useTheme() as ICustomTheme;
    const contextStyle = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;

    return (
      <Component
        ref={ref}
        style={[{ color: colors.text, fontSize: 16 }, contextStyle, style]}
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';

export { Text, TextClassContext };
