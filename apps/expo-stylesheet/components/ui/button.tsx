import * as React from 'react';
import { Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextClassContext } from '~/components/ui/text';
import { ICustomTheme, ICustomThemeColor } from '~/lib/constants';
import { mergeBaseStyleWithUserStyle } from '~/lib/utils';

type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type Size = 'default' | 'sm' | 'lg' | 'icon';

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> & {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ variant = 'default', size = 'default', disabled, style, ...props }, ref) => {
    const { colors } = useTheme() as ICustomTheme;
    const baseButtonStyles = [
      buttonVariants({ variant, size, colors }),
      disabled && styles.disabled,
    ];

    // merging base styles with user passed styles
    const mergedStyles = mergeBaseStyleWithUserStyle(baseButtonStyles, style);

    return (
      <TextClassContext.Provider value={buttonTextVariants({ variant, size, colors })}>
        <Pressable
          style={({ pressed, hovered }) => [
            ...mergedStyles,
            pressed && { backgroundColor: colors.accent, opacity: 0.7 },
            hovered && { backgroundColor: colors.accent, opacity: 0.7 },
          ]}
          ref={ref}
          role='button'
          disabled={disabled}
          {...props}
        />
      </TextClassContext.Provider>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
const styles = StyleSheet.create({
  baseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  baseButtonText: {
    fontSize: 16,
    fontWeight: 500,
  },
  disabled: {
    opacity: 0.5,
  },

  sizeDefault: {
    height: Platform.OS === 'web' ? 40 : 44,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sizeSm: {
    height: 36,
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  sizeLg: {
    height: Platform.OS === 'web' ? 44 : 50,
    paddingHorizontal: 32,
    borderRadius: 6,
  },
  sizeIcon: {
    height: 40,
    width: 40,
  },
});

export const buttonVariants = ({
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
    variantStyle = { backgroundColor: colors.buttonPrimary };
  } else if (variant === 'destructive') {
    variantStyle = { backgroundColor: colors.notification };
  } else if (variant === 'outline') {
    variantStyle = {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.buttonOutline,
    };
  } else if (variant === 'secondary') {
    variantStyle = { backgroundColor: colors.buttonSecondary };
  } else if (variant === 'ghost') {
    variantStyle = { backgroundColor: colors.buttonGhost };
  } else if (variant === 'link') {
    variantStyle = { backgroundColor: colors.buttonLink };
  }

  // === SIZE STYLES ===
  if (size === 'default') {
    sizeStyle = styles.sizeDefault;
  } else if (size === 'sm') {
    sizeStyle = styles.sizeSm;
  } else if (size === 'lg') {
    sizeStyle = styles.sizeLg;
  } else if (size === 'icon') {
    sizeStyle = styles.sizeIcon;
  }

  return StyleSheet.flatten([
    {
      ...styles.baseButton,
      ...variantStyle,
      ...sizeStyle,
    },
    style,
  ]);
};

export const buttonTextVariants = ({
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
  if (variant === 'default') {
    variantStyle = { color: colors.buttonPrimaryText };
  } else if (variant === 'destructive') {
    variantStyle = { color: '#fff' };
  } else if (variant === 'outline') {
    variantStyle = { color: colors.buttonOutlineText };
  } else if (variant === 'secondary') {
    variantStyle = { color: colors.buttonSecondaryText };
  } else if (variant === 'ghost') {
    variantStyle = { color: colors.buttonGhostText };
  } else if (variant === 'link') {
    variantStyle = { color: colors.buttonLinkText };
  }

  // === SIZE STYLES ===
  if (size === 'default') {
    sizeStyle = { fontSize: 14 };
  } else if (size === 'sm') {
    sizeStyle = { fontSize: 14 };
  } else if (size === 'lg') {
    sizeStyle = { fontSize: 16 };
  } else if (size === 'icon') {
    sizeStyle = { fontSize: 16 };
  }

  return StyleSheet.flatten([
    {
      ...styles.baseButtonText,
      ...variantStyle,
      ...sizeStyle,
    },
    style,
  ]);
};
