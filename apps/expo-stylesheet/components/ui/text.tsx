import { useTheme } from '@react-navigation/native';
import * as Slot from '@rn-primitives/slot';
import type { SlottableTextProps, TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Platform, Text as RNText, StyleProp, TextStyle } from 'react-native';
import { type ICustomTheme } from '~/lib/constants';

const TextClassContext = React.createContext<StyleProp<TextStyle>>(undefined);

const Text = React.forwardRef<TextRef, SlottableTextProps>(
  ({ asChild = false, style, ...props }, ref) => {
    const { colors } = useTheme() as ICustomTheme;
    const contextStyle = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;

    return (
      <Component
        ref={ref}
        style={[
          { color: colors.text, fontSize: Platform.OS === 'web' ? 16 : 14 },
          contextStyle,
          style,
        ]}
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';

export { Text, TextClassContext };
