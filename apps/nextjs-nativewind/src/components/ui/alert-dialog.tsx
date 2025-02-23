'use client';

import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { buttonTextVariants, buttonVariants } from '~/components/ui/button';
import * as AlertDialogPrimitive from '@rn-primitives/alert-dialog-new';
import { cn } from '~/lib/utils';
import { TextClassContext } from '~/components/ui/text';

// ! TODO: AS CHILD NOT WORKING FROM WEB TO REACT_NATIVE PRESSABLE

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlayWeb = ({ className, ...props }: AlertDialogPrimitive.OverlayProps) => {
  const { open } = AlertDialogPrimitive.useRootContext();
  return (
    <AlertDialogPrimitive.Overlay
      className={cn(
        'z-50 bg-black/80 flex justify-center items-center p-2 absolute top-0 right-0 bottom-0 left-0',
        open ? 'web:animate-in web:fade-in-0' : 'web:animate-out web:fade-out-0',
        className
      )}
      {...props}
    />
  );
};

const AlertDialogOverlayNative = ({
  className,
  children,
  ...props
}: AlertDialogPrimitive.OverlayProps) => {
  return (
    <AlertDialogPrimitive.Overlay
      style={StyleSheet.absoluteFill}
      className={cn('z-50 bg-black/80 flex justify-center items-center p-2', className)}
      {...props}
      asChild
    >
      <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(150)}>
        {children}
      </Animated.View>
    </AlertDialogPrimitive.Overlay>
  );
};

const AlertDialogOverlay = Platform.select({
  web: AlertDialogOverlayWeb,
  default: AlertDialogOverlayNative,
});

const AlertDialogContent = ({ className, native, ...props }: AlertDialogPrimitive.ContentProps) => {
  const { open } = AlertDialogPrimitive.useRootContext();

  return (
    <AlertDialogPortal {...native}>
      <AlertDialogOverlay className='fixed inset-0'>
        <AlertDialogPrimitive.Content
          className={cn(
            'z-50 max-w-lg gap-4 border border-border bg-background p-6 shadow-lg shadow-foreground/10 web:duration-200 rounded-lg',
            open
              ? 'web:animate-in web:fade-in-0 web:zoom-in-95'
              : 'web:animate-out web:fade-out-0 web:zoom-out-95',
            className
          )}
          {...props}
        />
      </AlertDialogOverlay>
    </AlertDialogPortal>
  );
};

const AlertDialogHeader = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View className={cn('flex flex-col gap-2', className)} {...props} />
);

const AlertDialogFooter = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end gap-2', className)}
    {...props}
  />
);

const AlertDialogTitle = ({ className, ...props }: AlertDialogPrimitive.TitleProps) => (
  <AlertDialogPrimitive.Title
    className={cn('text-lg native:text-xl text-foreground font-semibold', className)}
    {...props}
  />
);

const AlertDialogDescription = ({ className, ...props }: AlertDialogPrimitive.DescriptionProps) => (
  <AlertDialogPrimitive.Description
    className={cn('text-sm native:text-base text-muted-foreground', className)}
    {...props}
  />
);

const AlertDialogAction = ({ className, ...props }: AlertDialogPrimitive.ActionProps) => (
  <TextClassContext.Provider value={buttonTextVariants({ className })}>
    <AlertDialogPrimitive.Action className={cn(buttonVariants(), className)} {...props} />
  </TextClassContext.Provider>
);

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <TextClassContext.Provider value={buttonTextVariants({ className, variant: 'outline' })}>
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={cn(buttonVariants({ variant: 'outline', className }))}
      {...props}
    />
  </TextClassContext.Provider>
));
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
