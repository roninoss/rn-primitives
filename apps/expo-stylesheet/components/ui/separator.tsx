import * as React from 'react';
import * as SeparatorPrimitive from '@rn-primitives/separator';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, ViewStyle } from 'react-native';
import { type ICustomTheme } from '~/lib/constants';

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ orientation = 'horizontal', decorative = true, style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;

  const separatorStyle: ViewStyle =
    orientation === 'horizontal'
      ? { height: StyleSheet.hairlineWidth, width: '100%' }
      : { width: StyleSheet.hairlineWidth, height: '100%' };

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      style={[{ flexShrink: 0, backgroundColor: colors.borderMedium }, separatorStyle, style]}
      {...props}
    />
  );
});

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
