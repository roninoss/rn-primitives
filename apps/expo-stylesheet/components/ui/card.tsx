import * as React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextClassContext } from '~/components/ui/text';
import type { TextRef, ViewRef } from '@rn-primitives/types';
import { type ICustomTheme } from '~/lib/constants';

const Card = React.forwardRef<ViewRef, React.ComponentPropsWithoutRef<typeof View>>(
  ({ style, ...props }, ref) => {
    const { colors } = useTheme();

    return (
      <View
        ref={ref}
        style={[
          styles.card,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
            shadowColor: colors.text,
          },
          style,
        ]}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<ViewRef, React.ComponentPropsWithoutRef<typeof View>>(
  ({ style, ...props }, ref) => <View ref={ref} style={[styles.cardHeader, style]} {...props} />
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<TextRef, React.ComponentPropsWithoutRef<typeof Text>>(
  ({ style, ...props }, ref) => {
    const { colors } = useTheme();

    return (
      <Text
        role='heading'
        aria-level={3}
        ref={ref}
        style={[styles.cardTitle, { color: colors.text }, style]}
        {...props}
      />
    );
  }
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<TextRef, React.ComponentPropsWithoutRef<typeof Text>>(
  ({ style, ...props }, ref) => {
    const { colors } = useTheme() as ICustomTheme;

    return (
      <Text
        ref={ref}
        style={[styles.cardDescription, { color: colors.mutedText }, style]}
        {...props}
      />
    );
  }
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<ViewRef, React.ComponentPropsWithoutRef<typeof View>>(
  ({ style, ...props }, ref) => {
    const { colors } = useTheme();

    return (
      <TextClassContext.Provider value={{ color: colors.text }}>
        <View ref={ref} style={[styles.cardContent, style]} {...props} />
      </TextClassContext.Provider>
    );
  }
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<ViewRef, React.ComponentPropsWithoutRef<typeof View>>(
  ({ style, ...props }, ref) => <View ref={ref} style={[styles.cardFooter, style]} {...props} />
);
CardFooter.displayName = 'CardFooter';

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'column',
    gap: 6,
    padding: 24,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.25,
  },
  cardDescription: {
    fontSize: Platform.OS === 'web' ? 14 : 12,
    lineHeight: Platform.OS === 'web' ? 20 : 16,
  },
  cardContent: {
    padding: 24,
    paddingTop: 0,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    paddingTop: 0,
  },
});
