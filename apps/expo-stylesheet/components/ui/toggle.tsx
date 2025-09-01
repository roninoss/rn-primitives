import * as React from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { TextClassContext } from '~/components/ui/text';
import * as TogglePrimitive from '@rn-primitives/toggle';
import { type ICustomTheme, type ICustomThemeColor } from '~/lib/constants';

type Variant = 'default' | 'outline';
type Size = 'default' | 'sm' | 'lg';
type ToggleProps = { variant?: Variant; size?: Size };

const toggleVariants = ({
  variant = 'default',
  size = 'default',
  colors,
  style,
}: {
  variant?: Variant;
  size?: Size;
  colors: ICustomThemeColor;
  style?: StyleProp<ViewStyle>;
}): ViewStyle => {
  let variantStyle: ViewStyle = {};
  let sizeStyle: ViewStyle = {};

  // === VARIANT STYLES ===
  if (variant === 'default') {
    variantStyle = { backgroundColor: 'transparent' };
  } else if (variant === 'outline') {
    variantStyle = {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.borderMedium,
      backgroundColor: 'transparent',
    };
  }

  // === SIZE STYLES ===
  if (size === 'default') {
    sizeStyle = { height: 42, paddingHorizontal: 12 };
  } else if (size === 'sm') {
    sizeStyle = { height: 36, paddingHorizontal: 10 };
  } else if (size === 'lg') {
    sizeStyle = { height: 44, paddingHorizontal: 20 };
  }

  return StyleSheet.flatten([styles.baseToggle, variantStyle, sizeStyle, style]);
};

const toggleTextVariants = ({
  variant = 'default',
  size = 'default',
  colors,
  style,
}: {
  variant?: Variant;
  size?: Size;
  colors: ICustomThemeColor;
  style?: StyleProp<TextStyle>;
}): TextStyle => {
  let variantStyle: TextStyle = {};
  let sizeStyle: TextStyle = {};

  // === VARIANT STYLES ===
  if (variant === 'default') variantStyle = {};
  else if (variant === 'outline') variantStyle = {};

  // === SIZE STYLES ===
  if (size === 'default') sizeStyle = {};
  else if (size === 'sm') sizeStyle = {};
  else if (size === 'lg') sizeStyle = {};

  return StyleSheet.flatten([
    styles.baseToggleText,
    variantStyle,
    sizeStyle,
    { color: colors.text },
    style,
  ]);
};

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    ToggleProps & {
      style?: StyleProp<ViewStyle>;
      textStyle?: StyleProp<TextStyle>;
    }
>(({ variant, size, style, textStyle, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;
  const flattenToggleStyle = StyleSheet.flatten([
    toggleVariants({ variant, size, colors, style }),
    props.disabled && { opacity: 0.5 },
    props.pressed && { backgroundColor: colors.accent },
  ]);

  return (
    <TextClassContext.Provider
      value={[
        toggleTextVariants({ variant, size, colors, style: textStyle }),
        props.pressed && { color: colors.accentText },
      ]}
    >
      <TogglePrimitive.Root ref={ref} style={flattenToggleStyle} {...props} />
    </TextClassContext.Provider>
  );
});

Toggle.displayName = TogglePrimitive.Root.displayName;

function ToggleIcon({
  icon: Icon,
  style,
  ...props
}: React.ComponentPropsWithoutRef<LucideIcon> & {
  icon: LucideIcon;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();

  return <Icon style={style} color={colors.text} {...props} />;
}

export { Toggle, ToggleIcon, toggleTextVariants, toggleVariants, ToggleProps };

const styles = StyleSheet.create({
  baseToggle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  baseToggleText: {
    fontSize: 14,
    fontWeight: 500,
  },
});
