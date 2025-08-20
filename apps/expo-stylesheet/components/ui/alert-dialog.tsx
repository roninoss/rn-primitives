import * as React from 'react';
import { Platform, StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import * as AlertDialogPrimitive from '@rn-primitives/alert-dialog';
import { useTheme } from '@react-navigation/native';
import { TextClassContext } from '~/components/ui/text';
import { buttonVariants, buttonTextVariants } from '~/components/ui/button';
import { ICustomTheme } from '~/lib/constants';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlayWeb = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ style, ...props }, ref) => {
  // const { open } = AlertDialogPrimitive.useRootContext();
  return <AlertDialogPrimitive.Overlay ref={ref} style={[styles.overlayWeb, style]} {...props} />;
});
AlertDialogOverlayWeb.displayName = 'AlertDialogOverlayWeb';

const AlertDialogOverlayNative = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ children, style, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Overlay
      ref={ref}
      style={[StyleSheet.absoluteFill, styles.overlayNative, style]}
      {...props}
      asChild
    >
      <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(150)}>
        {children}
      </Animated.View>
    </AlertDialogPrimitive.Overlay>
  );
});
AlertDialogOverlayNative.displayName = 'AlertDialogOverlayNative';

const AlertDialogOverlay = Platform.select({
  web: AlertDialogOverlayWeb,
  default: AlertDialogOverlayNative,
});

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> & {
    portalHost?: string;
  }
>(({ portalHost, style, ...props }, ref) => {
  // const { open } = AlertDialogPrimitive.useRootContext();
  const { colors } = useTheme();

  return (
    <AlertDialogPortal hostName={portalHost}>
      <AlertDialogOverlay>
        <AlertDialogPrimitive.Content
          ref={ref}
          style={[
            styles.content,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              shadowColor: colors.text,
            },
            style,
          ]}
          {...props}
        />
      </AlertDialogOverlay>
    </AlertDialogPortal>
  );
});
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ style, ...props }: React.ComponentPropsWithoutRef<typeof View>) => (
  <View style={[styles.header, style]} {...props} />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter = ({ style, ...props }: React.ComponentPropsWithoutRef<typeof View>) => (
  <View style={[styles.footer, style]} {...props} />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme();

  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      style={[styles.title, { color: colors.text }, style]}
      {...props}
    />
  );
});
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      style={[styles.description, { color: colors.mutedText }, style]}
      {...props}
    />
  );
});
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <TextClassContext.Provider value={buttonTextVariants({ colors })}>
      <AlertDialogPrimitive.Action
        ref={ref}
        style={buttonVariants({ colors, style: style as StyleProp<ViewStyle> })}
        {...props}
      />
    </TextClassContext.Provider>
  );
});
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant: 'outline', colors })}>
      <AlertDialogPrimitive.Cancel
        ref={ref}
        style={buttonVariants({ variant: 'outline', colors, style: style as StyleProp<ViewStyle> })}
        {...props}
      />
    </TextClassContext.Provider>
  );
});
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};

const styles = StyleSheet.create({
  overlayWeb: {
    zIndex: 50,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  overlayNative: {
    zIndex: 50,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  content: {
    zIndex: 50,
    maxWidth: 512,
    gap: 16,
    borderWidth: 1,
    padding: 24,
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  header: {
    flexDirection: 'column',
    gap: 8,
  },
  footer: {
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    gap: 8,
  },
  title: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: 600,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
