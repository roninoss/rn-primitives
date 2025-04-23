'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { TextClassContext } from '~/components/ui/text';
import * as TogglePrimitive from '@rn-primitives/toggle';
import { cn } from '~/lib/utils';
import { Bold } from 'lucide-react';

const toggleVariants = cva(
  'web:group web:inline-flex items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:hover:bg-muted active:bg-muted web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent web:hover:bg-accent active:bg-accent active:bg-accent',
      },
      size: {
        default: 'h-10 px-3 native:h-12 native:px-[12]',
        sm: 'h-9 px-2.5 native:h-10 native:px-[9]',
        lg: 'h-11 px-5 native:h-14 native:px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const toggleTextVariants = cva('text-sm native:text-base text-foreground font-medium', {
  variants: {
    variant: {
      default: '',
      outline: 'web:group-hover:text-accent-foreground web:group-active:text-accent-foreground',
    },
    size: {
      default: '',
      sm: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const Toggle = ({
  className,
  variant,
  size,
  ...props
}: TogglePrimitive.RootProps & VariantProps<typeof toggleVariants>) => {
  const [pressed, setPressed] = React.useState(!!props.pressed);

  return (
    <TextClassContext.Provider
      value={cn(
        toggleTextVariants({ variant, size }),
        pressed ? 'text-accent-foreground' : 'web:group-hover:text-muted-foreground',
        className
      )}
    >
      <TogglePrimitive.Root
        className={cn(
          toggleVariants({ variant, size }),
          props.disabled && 'web:pointer-events-none opacity-50',
          pressed && 'bg-accent',
          className
        )}
        pressed={pressed}
        onPressedChange={setPressed}
        {...props}
      >
        <ToggleIcon icon={Bold} size={18} />
      </TogglePrimitive.Root>
    </TextClassContext.Provider>
  );
};

function ToggleIcon({
  className,
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<LucideIcon> & {
  icon: LucideIcon;
}) {
  const textClass = React.useContext(TextClassContext);
  return <Icon className={cn(textClass, className)} {...props} />;
}

export { Toggle, ToggleIcon, toggleTextVariants, toggleVariants };
