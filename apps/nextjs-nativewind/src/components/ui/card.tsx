'use client';

import * as React from 'react';
import { Text, View } from 'react-native';
import { TextClassContext } from '~/components/ui/text';
import type { TextRef, ViewRef } from '@rn-primitives/types';
import { cn } from '~/lib/utils';

const Card = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & {
  ref?: ViewRef;
}) => (
  <View
    ref={ref}
    className={cn(
      'rounded-lg border border-border bg-card shadow-sm shadow-foreground/10',
      className
    )}
    {...props}
  />
);
Card.displayName = 'Card';

const CardHeader = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & {
  ref?: ViewRef;
}) => <View ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />;
CardHeader.displayName = 'CardHeader';

const CardTitle = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Text> & {
  ref?: TextRef;
}) => (
  <Text
    role='heading'
    aria-level={3}
    ref={ref}
    className={cn(
      'text-2xl text-card-foreground font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
);
CardTitle.displayName = 'CardTitle';

const CardDescription = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Text> & {
  ref?: TextRef;
}) => <Text ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />;
CardDescription.displayName = 'CardDescription';

const CardContent = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & {
  ref?: ViewRef;
}) => (
  <TextClassContext.Provider value='text-card-foreground'>
    <View ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  </TextClassContext.Provider>
);
CardContent.displayName = 'CardContent';

const CardFooter = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & {
  ref?: ViewRef;
}) => (
  <View ref={ref} className={cn('flex flex-row items-center p-6 pt-0', className)} {...props} />
);
CardFooter.displayName = 'CardFooter';

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
