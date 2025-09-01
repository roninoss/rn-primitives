import * as DialogPrimitive from '@rn-primitives/dialog';
import * as React from 'react';
import { Platform, StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { X } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { ICustomTheme } from '~/lib/constants';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlayWeb = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ style, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      style={[styles.overlayWeb, style as StyleProp<ViewStyle>]}
      {...props}
    />
  );
});

DialogOverlayWeb.displayName = 'DialogOverlayWeb';

const DialogOverlayNative = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ children, style, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      style={[StyleSheet.absoluteFill, styles.overlayNative, style as StyleProp<ViewStyle>]}
      {...props}
    >
      <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(150)}>
        <>{children}</>
      </Animated.View>
    </DialogPrimitive.Overlay>
  );
});

DialogOverlayNative.displayName = 'DialogOverlayNative';

const DialogOverlay = Platform.select({
  web: DialogOverlayWeb,
  default: DialogOverlayNative,
});

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    portalHost?: string;
  }
>(({ children, portalHost, style, ...props }, ref) => {
  const { open } = DialogPrimitive.useRootContext();
  const { colors } = useTheme();

  return (
    <DialogPortal hostName={portalHost}>
      <DialogOverlay>
        <DialogPrimitive.Content
          ref={ref}
          style={[
            styles.content,
            {
              borderColor: colors.border,
              backgroundColor: colors.card,
              shadowColor: colors.text,
            },
            style,
          ]}
          {...props}
        >
          {children}
          <DialogPrimitive.Close style={styles.closeButton}>
            <X size={Platform.OS === 'web' ? 16 : 18} color={open ? colors.primary : colors.text} />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  );
});

DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ style, ...props }: React.ComponentPropsWithoutRef<typeof View>) => (
  <View style={[styles.header, style]} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ style, ...props }: React.ComponentPropsWithoutRef<typeof View>) => (
  <View style={[styles.footer, style]} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme();
  const flattenStyle = StyleSheet.flatten([styles.title, { color: colors.text }, style]);

  return <DialogPrimitive.Title ref={ref} style={flattenStyle} {...props} />;
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;
  const flattenStyle = StyleSheet.flatten([styles.description, { color: colors.mutedText }, style]);

  return <DialogPrimitive.Description ref={ref} style={flattenStyle} {...props} />;
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

const styles = StyleSheet.create({
  overlayWeb: {
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
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  content: {
    maxWidth: 512,
    gap: 16,
    borderWidth: 1,
    padding: 24,
    borderRadius: 8,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 2,
    borderRadius: 2,
    opacity: 0.7,
  },
  header: {
    flexDirection: 'column',
    gap: 6,
  },
  footer: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column-reverse',
    justifyContent: Platform.OS === 'web' ? 'flex-end' : 'flex-start',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.25,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
