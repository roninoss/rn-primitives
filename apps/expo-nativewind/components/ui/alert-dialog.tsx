import * as AlertDialogPrimitive from '@rn-primitives/alert-dialog';
import { Platform, View } from '@rn-primitives/core';
import { FadeIn, FadeOut, ZoomIn, ZoomOut } from '@rn-primitives/core/dist/native/reanimated';
import { mergeProps } from '@rn-primitives/utils';
import * as React from 'react';
import { buttonTextVariants, buttonVariants } from '~/components/ui/button';
import { TextClassContext } from '~/components/ui/text';
import { cn } from '~/lib/utils';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const OVERLAY_NATIVE_PROPS = {
  isAnimated: true,
  entering: FadeIn,
  exiting: FadeOut.duration(150),
};

function AlertDialogOverlay({ className, native, ...props }: AlertDialogPrimitive.OverlayProps) {
  return (
    <AlertDialogPrimitive.Overlay
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

function AlertDialogContent({
  className,
  native: { portalHost, ...nativeProp } = {},
  ...props
}: Omit<AlertDialogPrimitive.ContentProps, 'native'> & {
  native?: AlertDialogPrimitive.ContentProps['native'] & { portalHost?: string };
}) {
  return (
    <AlertDialogPortal native={portalHost ? { hostName: portalHost } : undefined}>
      <AlertDialogOverlay>
        <AlertDialogPrimitive.Content
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
        />
      </AlertDialogOverlay>
    </AlertDialogPortal>
  );
}

const AlertDialogHeader = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View className={cn('flex flex-col gap-2 text-center sm:text-left', className)} {...props} />
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

const AlertDialogAction = ({ className, ...props }: AlertDialogPrimitive.ActionProps) => (
  <TextClassContext.Provider value={buttonTextVariants({ className })}>
    <AlertDialogPrimitive.Action className={cn(buttonVariants(), className)} {...props} />
  </TextClassContext.Provider>
);

const AlertDialogCancel = ({ className, ...props }: AlertDialogPrimitive.CancelProps) => (
  <TextClassContext.Provider value={buttonTextVariants({ className, variant: 'outline' })}>
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: 'outline', className }))}
      {...props}
    />
  </TextClassContext.Provider>
);

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
