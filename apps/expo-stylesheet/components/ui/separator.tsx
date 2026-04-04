import * as React from 'react';
import * as SeparatorPrimitive from '@rn-primitives/separator';
import { useTheme } from '@react-navigation/native';
import { ViewStyle } from 'react-native';
import { type ICustomTheme } from '~/lib/constants';

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ orientation = 'horizontal', decorative = true, style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;

  const separatorStyle: ViewStyle =
    orientation === 'horizontal' ? { height: 1, width: '100%' } : { width: 1, height: '100%' };

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      style={[{ flexShrink: 0, backgroundColor: colors.border }, separatorStyle, style]}
      {...props}
    />
  );
});

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
