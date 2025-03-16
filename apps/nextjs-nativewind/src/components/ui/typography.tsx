'use client';

import { Slot } from '@rn-primitives/slot';
import { SlottableTextProps, TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Platform, Text as RNText } from 'react-native';
import { cn } from '~/lib/utils';

const H1 = ({
  ref,
  className,
  asChild = false,
  ...props
}: SlottableTextProps & {
  ref?: React.RefObject<TextRef>;
}) => {
  const Component = asChild ? Slot : RNText;
  return (
    <Component
      role='heading'
      aria-level='1'
      className={cn(
        'web:scroll-m-20 text-4xl text-foreground font-extrabold tracking-tight lg:text-5xl web:select-text',
        className
      )}
      ref={ref}
      {...props}
    />
  );
};

H1.displayName = 'H1';

const H2 = ({
  ref,
  className,
  asChild = false,
  ...props
}: SlottableTextProps & {
  ref?: React.RefObject<TextRef>;
}) => {
  const Component = asChild ? Slot : RNText;
  return (
    <Component
      role='heading'
      aria-level='2'
      className={cn(
        'web:scroll-m-20 border-b border-border pb-2 text-3xl text-foreground font-semibold tracking-tight first:mt-0 web:select-text',
        className
      )}
      ref={ref}
      {...props}
    />
  );
};

H2.displayName = 'H2';

const H3 = ({
  ref,
  className,
  asChild = false,
  ...props
}: SlottableTextProps & {
  ref?: React.RefObject<TextRef>;
}) => {
  const Component = asChild ? Slot : RNText;
  return (
    <Component
      role='heading'
      aria-level='3'
      className={cn(
        'web:scroll-m-20 text-2xl text-foreground font-semibold tracking-tight web:select-text',
        className
      )}
      ref={ref}
      {...props}
    />
  );
};

H3.displayName = 'H3';

const H4 = ({
  ref,
  className,
  asChild = false,
  ...props
}: SlottableTextProps & {
  ref?: React.RefObject<TextRef>;
}) => {
  const Component = asChild ? Slot : RNText;
  return (
    <Component
      role='heading'
      aria-level='4'
      className={cn(
        'web:scroll-m-20 text-xl text-foreground font-semibold tracking-tight web:select-text',
        className
      )}
      ref={ref}
      {...props}
    />
  );
};

H4.displayName = 'H4';

const P = ({
  ref,
  className,
  asChild = false,
  ...props
}: SlottableTextProps & {
  ref?: React.RefObject<TextRef>;
}) => {
  const Component = asChild ? Slot : RNText;
  return (
    <Component
      className={cn('text-base text-foreground web:select-text', className)}
      ref={ref}
      {...props}
    />
  );
};
P.displayName = 'P';

const BlockQuote = ({
  ref,
  className,
  asChild = false,
  ...props
}: SlottableTextProps & {
  ref?: React.RefObject<TextRef>;
}) => {
  const Component = asChild ? Slot : RNText;
  return (
    <Component
      // @ts-ignore - role of blockquote renders blockquote element on the web
      role={Platform.OS === 'web' ? 'blockquote' : undefined}
      className={cn(
        'mt-6 native:mt-4 border-l-2 border-border pl-6 native:pl-3 text-base text-foreground italic web:select-text',
        className
      )}
      ref={ref}
      {...props}
    />
  );
};

BlockQuote.displayName = 'BlockQuote';

const Code = ({
  ref,
  className,
  asChild = false,
  ...props
}: SlottableTextProps & {
  ref?: React.RefObject<TextRef>;
}) => {
  const Component = asChild ? Slot : RNText;
  return (
    <Component
      // @ts-ignore - role of code renders code element on the web
      role={Platform.OS === 'web' ? 'code' : undefined}
      className={cn(
        'relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] text-sm text-foreground font-semibold web:select-text',
        className
      )}
      ref={ref}
      {...props}
    />
  );
};

Code.displayName = 'Code';

const Lead = ({
  ref,
  className,
  asChild = false,
  ...props
}: SlottableTextProps & {
  ref?: React.RefObject<TextRef>;
}) => {
  const Component = asChild ? Slot : RNText;
  return (
    <Component
      className={cn('text-xl text-muted-foreground web:select-text', className)}
      ref={ref}
      {...props}
    />
  );
};

Lead.displayName = 'Lead';

const Large = ({
  ref,
  className,
  asChild = false,
  ...props
}: SlottableTextProps & {
  ref?: React.RefObject<TextRef>;
}) => {
  const Component = asChild ? Slot : RNText;
  return (
    <Component
      className={cn('text-xl text-foreground font-semibold web:select-text', className)}
      ref={ref}
      {...props}
    />
  );
};

Large.displayName = 'Large';

const Small = ({
  ref,
  className,
  asChild = false,
  ...props
}: SlottableTextProps & {
  ref?: React.RefObject<TextRef>;
}) => {
  const Component = asChild ? Slot : RNText;
  return (
    <Component
      className={cn('text-sm text-foreground font-medium leading-none web:select-text', className)}
      ref={ref}
      {...props}
    />
  );
};

Small.displayName = 'Small';

const Muted = ({
  ref,
  className,
  asChild = false,
  ...props
}: SlottableTextProps & {
  ref?: React.RefObject<TextRef>;
}) => {
  const Component = asChild ? Slot : RNText;
  return (
    <Component
      className={cn('text-sm text-muted-foreground web:select-text', className)}
      ref={ref}
      {...props}
    />
  );
};

Muted.displayName = 'Muted';

export { BlockQuote, Code, H1, H2, H3, H4, Large, Lead, Muted, P, Small };
