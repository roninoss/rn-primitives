'use client';

import * as NavigationMenuPrimitive from '@rn-primitives/navigation-menu';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { ChevronDown } from '~/lib/icons/ChevronDown';
import { cn } from '~/lib/utils';

const NavigationMenu = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> & {
  ref?: React.RefObject<React.ElementRef<typeof NavigationMenuPrimitive.Root>>;
}) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(' flex flex-row max-w-max items-center justify-center', className)}
    {...props}
  >
    {children}
    {Platform.OS === 'web' && <NavigationMenuViewport />}
  </NavigationMenuPrimitive.Root>
);
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List> & {
  ref?: React.RefObject<React.ElementRef<typeof NavigationMenuPrimitive.List>>;
}) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      'web:group flex flex-1 flex-row web:list-none items-center justify-center gap-1',
      className
    )}
    {...props}
  />
);
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  'web:group web:inline-flex flex-row h-10 native:h-12 native:px-3 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium web:transition-colors web:hover:bg-accent active:bg-accent web:hover:text-accent-foreground web:focus:bg-accent web:focus:text-accent-foreground web:focus:outline-none web:disabled:pointer-events-none disabled:opacity-50 web:data-[active]:bg-accent/50 web:data-[state=open]:bg-accent/50'
);

const NavigationMenuTrigger = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> & {
  ref?: React.RefObject<React.ElementRef<typeof NavigationMenuPrimitive.Trigger>>;
}) => {
  const { value } = NavigationMenuPrimitive.useRootContext();
  const { value: itemValue } = NavigationMenuPrimitive.useItemContext();

  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(
        navigationMenuTriggerStyle(),
        'web:group gap-1.5',
        value === itemValue && 'bg-accent',
        className
      )}
      {...props}
    >
      <>{children}</>
      <View className={cn('transition-transform', value === itemValue ? 'rotate-180' : 'rotate-0')}>
        <ChevronDown
          size={12}
          className={cn('relative text-foreground h-3 w-3 web:transition web:duration-200')}
          aria-hidden={true}
        />
      </View>
    </NavigationMenuPrimitive.Trigger>
  );
};
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = ({
  ref,
  className,
  children,
  portalHost,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> & {
  portalHost?: string;
  ref?: React.RefObject<React.ElementRef<typeof NavigationMenuPrimitive.Content>>;
}) => {
  const { value } = NavigationMenuPrimitive.useRootContext();
  const { value: itemValue } = NavigationMenuPrimitive.useItemContext();
  return (
    <NavigationMenuPrimitive.Portal hostName={portalHost}>
      <NavigationMenuPrimitive.Content
        ref={ref}
        className={cn(
          'w-full relative native:border native:border-border native:rounded-lg native:shadow-lg native:bg-popover native:text-popover-foreground native:overflow-hidden',
          value === itemValue
            ? 'web:animate-in web:fade-in web:slide-in-from-right-20'
            : 'web:animate-out web:fade-out web:slide-out-to-left-20',
          className
        )}
        {...props}
      >
        {children}
      </NavigationMenuPrimitive.Content>
    </NavigationMenuPrimitive.Portal>
  );
};
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport> & {
  ref?: React.RefObject<React.ElementRef<typeof NavigationMenuPrimitive.Viewport>>;
}) => {
  return (
    <View className={cn('absolute left-0 top-full flex justify-center')}>
      <View
        className={cn(
          'web:origin-top-center relative mt-1.5 web:h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg web:animate-in web:zoom-in-90',
          className
        )}
        ref={ref}
        {...props}
      >
        <NavigationMenuPrimitive.Viewport />
      </View>
    </View>
  );
};
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator> & {
  ref?: React.RefObject<React.ElementRef<typeof NavigationMenuPrimitive.Indicator>>;
}) => {
  const { value } = NavigationMenuPrimitive.useRootContext();
  const { value: itemValue } = NavigationMenuPrimitive.useItemContext();

  return (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn(
        'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
        value === itemValue ? 'web:animate-in web:fade-in' : 'web:animate-out web:fade-out',
        className
      )}
      {...props}
    >
      <View className='relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md shadow-foreground/5' />
    </NavigationMenuPrimitive.Indicator>
  );
};
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};
