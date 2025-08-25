import * as Slot from '@rn-primitives/slot';
import { SlottableTextProps, TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Platform, StyleSheet, Text as RNText } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ICustomTheme } from '~/lib/constants';

const H1 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { colors } = useTheme();
    const Component = asChild ? Slot.Text : RNText;
    const themedStyle = [styles.h1, { color: colors.text }, style];

    return <Component role='heading' aria-level='1' style={themedStyle} ref={ref} {...props} />;
  }
);

H1.displayName = 'H1';

const H2 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { colors } = useTheme();
    const Component = asChild ? Slot.Text : RNText;
    const themedStyle = [
      styles.h2,
      {
        color: colors.text,
        borderBottomColor: colors.border,
      },
      style,
    ];

    return <Component role='heading' aria-level='2' style={themedStyle} ref={ref} {...props} />;
  }
);

H2.displayName = 'H2';

const H3 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { colors } = useTheme();
    const Component = asChild ? Slot.Text : RNText;
    const themedStyle = [styles.h3, { color: colors.text }, style];

    return <Component role='heading' aria-level='3' style={themedStyle} ref={ref} {...props} />;
  }
);

H3.displayName = 'H3';

const H4 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { colors } = useTheme();
    const Component = asChild ? Slot.Text : RNText;
    const themedStyle = [styles.h4, { color: colors.text }, style];

    return <Component role='heading' aria-level='4' style={themedStyle} ref={ref} {...props} />;
  }
);

H4.displayName = 'H4';

const P = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { colors } = useTheme();
    const Component = asChild ? Slot.Text : RNText;
    const themedStyle = [styles.p, { color: colors.text }, style];

    return <Component style={themedStyle} ref={ref} {...props} />;
  }
);

P.displayName = 'P';

const BlockQuote = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { colors } = useTheme();
    const Component = asChild ? Slot.Text : RNText;
    const themedStyle = [
      styles.blockquote,
      {
        color: colors.text,
        borderColor: colors.border,
      },
      style,
    ];

    return (
      <Component
        // @ts-ignore - role of blockquote renders blockquote element on the web
        role={Platform.OS === 'web' ? 'blockquote' : undefined}
        style={themedStyle}
        ref={ref}
        {...props}
      />
    );
  }
);

BlockQuote.displayName = 'BlockQuote';

const Code = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { colors } = useTheme() as ICustomTheme;
    const Component = asChild ? Slot.Text : RNText;
    const themedStyle = [
      styles.code,
      {
        color: colors.text,
        backgroundColor: colors.muted,
      },
      style,
    ];

    return (
      <Component
        // @ts-ignore - role of code renders code element on the web
        role={Platform.OS === 'web' ? 'code' : undefined}
        style={themedStyle}
        ref={ref}
        {...props}
      />
    );
  }
);

Code.displayName = 'Code';

const Lead = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { colors } = useTheme() as ICustomTheme;
    const Component = asChild ? Slot.Text : RNText;
    const themedStyle = [styles.lead, { color: colors.mutedText }, style];

    return <Component style={themedStyle} ref={ref} {...props} />;
  }
);

Lead.displayName = 'Lead';

const Large = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { colors } = useTheme();
    const Component = asChild ? Slot.Text : RNText;
    const themedStyle = [styles.large, { color: colors.text }, style];

    return <Component style={themedStyle} ref={ref} {...props} />;
  }
);

Large.displayName = 'Large';

const Small = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { colors } = useTheme();
    const Component = asChild ? Slot.Text : RNText;
    const themedStyle = [styles.small, { color: colors.text }, style];

    return <Component style={themedStyle} ref={ref} {...props} />;
  }
);

Small.displayName = 'Small';

const Muted = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, asChild = false, ...props }, ref) => {
    const { colors } = useTheme() as ICustomTheme;
    const Component = asChild ? Slot.Text : RNText;
    const themedStyle = [styles.muted, { color: colors.mutedText }, style];

    return <Component style={themedStyle} ref={ref} {...props} />;
  }
);

Muted.displayName = 'Muted';

export { BlockQuote, Code, H1, H2, H3, H4, Large, Lead, Muted, P, Small };

const styles = StyleSheet.create({
  h1: {
    fontSize: 36, // ~text-4xl
    lineHeight: 40,
    fontWeight: 800,
    letterSpacing: -0.25,
  },
  h2: {
    fontSize: 30, // ~text-3xl
    lineHeight: 36,
    fontWeight: 600,
    letterSpacing: -0.25,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  h3: {
    fontSize: 24, // ~text-2xl
    lineHeight: 32,
    fontWeight: 600,
    letterSpacing: -0.25,
  },
  h4: {
    fontSize: 20, // ~text-xl
    lineHeight: 28,
    fontWeight: 600,
    letterSpacing: -0.25,
  },
  p: {
    fontSize: 16,
    lineHeight: 24,
  },
  blockquote: {
    marginTop: 24,
    borderLeftWidth: 2,
    paddingLeft: 24,
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  code: {
    position: 'relative',
    borderRadius: 6,
    paddingHorizontal: 4.8,
    paddingVertical: 3.2,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 600,
  },
  lead: {
    fontSize: 20,
    lineHeight: 28,
  },
  large: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 600,
  },
  small: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 16,
  },
  muted: {
    fontSize: 14,
    lineHeight: 20,
  },
});
