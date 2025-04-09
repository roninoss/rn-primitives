import { Platform, Pressable } from '@rn-primitives/core';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';

const baseButtonVariants = cva('group flex items-center justify-center rounded-md', {
  variants: {
    variant: {
      default: 'bg-primary active:opacity-90',
      destructive: 'bg-destructive active:opacity-90',
      outline: 'border border-input bg-background active:bg-accent',
      secondary: 'bg-secondary active:opacity-80',
      ghost: 'active:bg-accent',
      link: 'active:underline',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const webButtonVariants = cva(
  'ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'hover:opacity-90',
        destructive: 'hover:opacity-90',
        outline: 'hover:bg-accent hover:text-accent-foreground',
        secondary: 'hover:opacity-80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline focus:underline',
      },
      size: {
        default: '',
        sm: '',
        lg: '',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const baseButtonTextVariants = cva('text-sm font-medium text-foreground', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'group-active:text-accent-foreground',
      secondary: 'text-secondary-foreground group-active:text-secondary-foreground',
      ghost: 'group-active:text-accent-foreground',
      link: 'text-primary group-active:underline',
    },
    size: {
      default: '',
      sm: '',
      lg: '',
      icon: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const WEB_ONLY_BUTTON_TEXT_CLASSNAME = 'whitespace-nowrap select-none transition-colors';

type ButtonProps = React.ComponentProps<typeof Pressable> & VariantProps<typeof baseButtonVariants>;

const BUTTON_WEB_PROPS = {
  as: 'button',
} as const;

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <TextClassContext.Provider
      value={cn(
        baseButtonTextVariants({ variant, size }),
        Platform.select({
          web: cn(WEB_ONLY_BUTTON_TEXT_CLASSNAME, props.disabled && 'pointer-events-none'),
        })
      )}
    >
      <Pressable
        className={cn(
          props.disabled && 'opacity-50',
          baseButtonVariants({ variant, size }),
          Platform.select({
            web: cn(webButtonVariants({ variant, size }), props.disabled && 'pointer-events-none'),
          }),
          className
        )}
        web={BUTTON_WEB_PROPS}
        role='button'
        {...props}
      />
    </TextClassContext.Provider>
  );
};

export { Button };
export type { ButtonProps };
