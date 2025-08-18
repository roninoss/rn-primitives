import * as React from 'react';
import { Pressable, StyleSheet, TextStyle, ViewStyle } from 'react-native';
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
};

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ variant = 'default', size = 'default', disabled, style, ...props }, ref) => {
    const { colors } = useTheme() as ICustomTheme;

    const baseStyles: (ViewStyle | false | undefined | null)[] = [
      styles.base,
      getVariantStyle(variant, colors),
      getSizeStyle(size),
      disabled && styles.disabled,
    ];

    // merging base styles with user passed styles
    const mergedStyles = mergeBaseStyleWithUserStyle(baseStyles, style);

    const buttonTextStyles: TextStyle[] = [
      styles.textBase,
      getTextVariantStyle(variant, colors),
      getTextSizeStyle(size),
    ];

    return (
      <TextClassContext.Provider value={buttonTextStyles}>
        <Pressable style={mergedStyles} ref={ref} role='button' disabled={disabled} {...props} />
      </TextClassContext.Provider>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  disabled: {
    opacity: 0.5,
  },

  textBase: {
    fontSize: 16,
    fontWeight: '500',
  },

  sizeDefault: {
    height: 48,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sizeSm: {
    height: 36,
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  sizeLg: {
    height: 50,
    paddingHorizontal: 32,
    borderRadius: 6,
  },
  sizeIcon: {
    height: 40,
    width: 40,
  },
});

// === VARIANT STYLES ===
function getVariantStyle(variant: Variant, colors: ICustomThemeColor): ViewStyle {
  switch (variant) {
    case 'default':
      return { backgroundColor: colors.buttonPrimary };
    case 'destructive':
      return { backgroundColor: colors.notification };
    case 'outline':
      return {
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.buttonOutline,
      };
    case 'secondary':
      return { backgroundColor: colors.buttonSecondary };
    case 'ghost':
      return { backgroundColor: colors.buttonGhost };
    case 'link':
      return { backgroundColor: colors.buttonLink };
    default:
      return {};
  }
}

function getTextVariantStyle(variant: Variant, colors: ICustomThemeColor): TextStyle {
  switch (variant) {
    case 'default':
      return { color: colors.buttonPrimaryText };
    case 'destructive':
      return { color: '#fff' }; // destructive text
    case 'outline':
      return { color: colors.buttonOutlineText };
    case 'secondary':
      return { color: colors.buttonSecondaryText };
    case 'ghost':
      return { color: colors.buttonGhostText };
    case 'link':
      return { color: colors.buttonLinkText, textDecorationLine: 'underline' };
    default:
      return {};
  }
}

// === SIZE STYLES ===
function getSizeStyle(size: Size): ViewStyle {
  switch (size) {
    case 'default':
      return styles.sizeDefault;
    case 'sm':
      return styles.sizeSm;
    case 'lg':
      return styles.sizeLg;
    case 'icon':
      return styles.sizeIcon;
    default:
      return {};
  }
}

function getTextSizeStyle(size: Size): TextStyle {
  switch (size) {
    case 'default':
      return { fontSize: 16 };
    case 'sm':
      return { fontSize: 14 };
    case 'lg':
      return { fontSize: 18 };
    case 'icon':
      return { fontSize: 16 };
    default:
      return {};
  }
}
