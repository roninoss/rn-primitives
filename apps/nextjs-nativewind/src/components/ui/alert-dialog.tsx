'use client';

import * as AlertDialogPrimitive from '@rn-primitives/alert-dialog';
import { Platform, View } from '@rn-primitives/core';
import { FadeIn, FadeOut } from '@rn-primitives/core/native-only-reanimated';
import * as React from 'react';
import { buttonTextVariants, buttonVariants } from '~/components/ui/button';
import { TextClassContext } from '~/components/ui/text';
import { cn } from '~/lib/utils';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

function AlertDialogOverlay({
  className,
  native: { isAnimated = true, ...restNative } = {},
  ...props
}: AlertDialogPrimitive.OverlayProps) {
  return (
    <AlertDialogPrimitive.Overlay
      native={{
        isAnimated: isAnimated as true,
        entering: FadeIn.duration(250),
        exiting: FadeOut,
        ...restNative,
      }}
      className={cn(
        Platform.select({
          web: 'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          native:
            'bg-black/80 flex justify-center items-center p-2 absolute top-0 right-0 bottom-0 left-0',
        }),
        className
      )}
      {...props}
    />
  );
}

const AlertDialogContent = ({
  ref,
  className,
  native: { portalHost, ...nativeProp } = {},
  ...props
}: Omit<AlertDialogPrimitive.ContentProps, 'native'> & {
  native?: AlertDialogPrimitive.ContentProps['native'] & { portalHost?: string };
} & {
  ref?: React.RefObject<React.ElementRef<typeof AlertDialogPrimitive.Content>>;
}) => {
  return (
    <AlertDialogPortal native={portalHost ? { hostName: portalHost } : undefined}>
      {/* {Platform.OS === 'web' ? ( */}
      {/* <> */}
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn(
          Platform.select({
            web: 'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
            native: 'max-w-lg gap-4 border bg-background p-6 shadow-lg border-border rounded-lg',
          }),
          className
        )}
        {...props}
      />
      {/* </>
    ) : (
      <AlertDialogOverlay>
        <AlertDialogPrimitive.Content
          className={cn(
            Platform.select({
              web: 'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
              native:
                'max-w-lg gap-4 border bg-background p-6 shadow-lg border-border rounded-lg',
            }),
            className
          )}
          native={nativeProp}
          {...props}
        />
      </AlertDialogOverlay>
    )} */}
    </AlertDialogPortal>
  );
};

const AlertDialogHeader = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View className={cn('flex flex-col gap-2 text-center sm:text-left', className)} {...props} />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end gap-2', className)}
    {...props}
  />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

function AlertDialogTitle({ className, ...props }: AlertDialogPrimitive.TitleProps) {
  return (
    <AlertDialogPrimitive.Title
      className={cn(
        'text-lg  text-foreground font-semibold',
        Platform.select({ native: 'text-xl' }),
        className
      )}
      {...props}
    />
  );
}

function AlertDialogDescription({ className, ...props }: AlertDialogPrimitive.DescriptionProps) {
  return (
    <AlertDialogPrimitive.Description
      className={cn('text-sm native:text-base text-muted-foreground', className)}
      {...props}
    />
  );
}

const AlertDialogAction = ({
  ref,
  className,
  ...props
}: AlertDialogPrimitive.ActionProps & {
  ref: React.RefObject<AlertDialogPrimitive.ActionRef>;
}) => (
  <TextClassContext.Provider value={buttonTextVariants({ className })}>
    <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
  </TextClassContext.Provider>
);
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = ({
  ref,
  className,
  ...props
}: AlertDialogPrimitive.CancelProps & {
  ref: React.RefObject<AlertDialogPrimitive.CancelRef>;
}) => (
  <TextClassContext.Provider value={buttonTextVariants({ className, variant: 'outline' })}>
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={cn(buttonVariants({ variant: 'outline', className }))}
      {...props}
    />
  </TextClassContext.Provider>
);
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
