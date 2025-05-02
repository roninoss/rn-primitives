'use client';

import { VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react-native';
import * as React from 'react';
import { toggleTextVariants, toggleVariants } from '~/components/ui/toggle';
import { TextClassContext } from '~/components/ui/text';
import * as ToggleGroupPrimitive from '@rn-primitives/toggle-group';
import { cn } from '~/lib/utils';

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants> | null>(null);

const ToggleGroup = ({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) => (
  <ToggleGroupPrimitive.Root
    className={cn('flex flex-row items-center justify-center gap-1', className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
);

function useToggleGroupContext() {
  const context = React.useContext(ToggleGroupContext);
  if (context === null) {
    throw new Error(
      'ToggleGroup compound components cannot be rendered outside the ToggleGroup component'
    );
  }
  return context;
}

const ToggleGroupItem = ({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) => {
  const context = useToggleGroupContext();
  const { value } = ToggleGroupPrimitive.useRootContext();

  return (
    <TextClassContext.Provider
      value={cn(
        toggleTextVariants({ variant, size }),
        ToggleGroupPrimitive.getIsSelected(value, props.value)
          ? 'text-accent-foreground'
          : 'web:group-hover:text-muted-foreground'
      )}
    >
      <ToggleGroupPrimitive.Item
        className={cn(
          toggleVariants({
            variant: context.variant || variant,
            size: context.size || size,
          }),
          props.disabled && 'web:pointer-events-none opacity-50',
          ToggleGroupPrimitive.getIsSelected(value, props.value) && 'bg-accent',
          className
        )}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Item>
    </TextClassContext.Provider>
  );
};

function ToggleGroupIcon({
  className,
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<LucideIcon> & {
  icon: LucideIcon;
}) {
  const textClass = React.useContext(TextClassContext);
  return <Icon className={cn(textClass, className)} {...props} />;
}

export { ToggleGroup, ToggleGroupIcon, ToggleGroupItem };
