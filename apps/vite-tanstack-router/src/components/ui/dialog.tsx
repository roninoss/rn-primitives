'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Platform, View } from '@rn-primitives/core';
import { FadeIn, FadeOut, ZoomIn, ZoomOut } from '@rn-primitives/core/native-only-reanimated';
import * as DialogPrimitive from '@rn-primitives/dialog';
import { mergeProps } from '@rn-primitives/utils';
import { X } from 'lucide-react';
import * as React from 'react';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const OVERLAY_NATIVE_PROPS = {
  isAnimated: true,
  entering: FadeIn,
  exiting: FadeOut.duration(150),
};

function DialogOverlay({ className, native, ...props }: DialogPrimitive.OverlayProps) {
  return (
    <DialogPrimitive.Overlay
      native={mergeProps(OVERLAY_NATIVE_PROPS, native)}
      className={cn(
        // z-50 important for exit animation on native
        'z-50 top-0 right-0 bottom-0 left-0',
        Platform.select({
          web: 'fixed bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          native: 'bg-black/50 dark:bg-black/80 flex justify-center items-center p-2 absolute ',
        }),
        className
      )}
      {...props}
    />
  );
}

const CONTENT_NATIVE_PROPS = {
  isAnimated: true,
  entering: ZoomIn.duration(200).withInitialValues({ transform: [{ scale: 0.85 }] }),
  exiting: ZoomOut.duration(400),
};

function DialogContent({
  className,
  children,
  native: { portalHost, ...nativeProp } = {},
  ...props
}: Omit<DialogPrimitive.ContentProps, 'native'> & {
  native?: DialogPrimitive.ContentProps['native'] & { portalHost?: string };
}) {
  const { open } = DialogPrimitive.useRootContext();
  return (
    <DialogPortal native={portalHost ? { hostName: portalHost } : undefined}>
      <DialogOverlay>
        <DialogPrimitive.Content asChild={Platform.OS === 'web'}>
          {/* DialogPrimitive.Content uses `nativeID` for accessibility, so it prevents the entering animation from working https://docs.swmansion.com/react-native-reanimated/docs/layout-animations/entering-exiting-animations/#remarks */}
          <View
            className={cn(
              Platform.select({
                web: 'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
                native:
                  'z-50 max-w-lg gap-4 border bg-background p-6 shadow-lg border-border rounded-lg',
              }),
              className
            )}
            native={mergeProps(CONTENT_NATIVE_PROPS, nativeProp)}
            {...props}
          >
            {children}
            <DialogPrimitive.Close
              className={
                'absolute right-4 top-4 p-0.5 web:group rounded-sm opacity-70 web:ring-offset-background web:transition-opacity web:hover:opacity-100 web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2 web:disabled:pointer-events-none'
              }
            >
              <X
                size={Platform.OS === 'web' ? 16 : 18}
                className={cn('text-muted-foreground', open && 'text-accent-foreground')}
              />
            </DialogPrimitive.Close>
          </View>
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  );
}

const DialogHeader = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) => (
  <View className={cn('flex flex-col gap-1.5 text-center sm:text-left', className)} {...props} />
);

const DialogFooter = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end gap-2', className)}
    {...props}
  />
);

function DialogTitle({ className, ...props }: DialogPrimitive.TitleProps) {
  return (
    <DialogPrimitive.Title
      className={cn(
        'text-lg native:text-xl text-foreground font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: DialogPrimitive.DescriptionProps) {
  return (
    <DialogPrimitive.Description
      className={cn('text-sm native:text-base text-muted-foreground', className)}
      {...props}
    />
  );
}

const DialogClose = ({ className, ...props }: DialogPrimitive.CloseProps) => (
  <Button asChild variant='outline'>
    <DialogPrimitive.Close {...props} />
  </Button>
);

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
