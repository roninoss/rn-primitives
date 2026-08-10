import * as AvatarPrimitive from '@rn-primitives/avatar';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ICustomTheme } from '~/lib/constants';

const AvatarPrimitiveRoot = AvatarPrimitive.Root;
const AvatarPrimitiveImage = AvatarPrimitive.Image;
const AvatarPrimitiveFallback = AvatarPrimitive.Fallback;

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitiveRoot>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitiveRoot>
>(({ style, ...props }, ref) => {
  return <AvatarPrimitiveRoot ref={ref} style={[styles.root, style]} {...props} />;
});
Avatar.displayName = AvatarPrimitiveRoot.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitiveImage>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitiveImage>
>(({ style, ...props }, ref) => {
  return <AvatarPrimitiveImage ref={ref} style={[styles.image, style]} {...props} />;
});
AvatarImage.displayName = AvatarPrimitiveImage.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitiveFallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitiveFallback>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <AvatarPrimitiveFallback
      ref={ref}
      style={[
        styles.fallback,
        { backgroundColor: colors.muted, borderColor: colors.border },
        style,
      ]}
      {...props}
    />
  );
});
AvatarFallback.displayName = AvatarPrimitiveFallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    height: 40, // h-10
    width: 40, // w-10
    flexShrink: 0,
    overflow: 'hidden',
    borderRadius: 50, // rounded-full
  },
  image: {
    aspectRatio: 1,
    height: '100%',
    width: '100%',
    // resizeMode: 'cover',
  },
  fallback: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
