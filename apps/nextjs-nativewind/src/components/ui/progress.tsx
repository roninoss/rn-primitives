'use client';

import * as ProgressPrimitive from '@rn-primitives/progress';
import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorClassName?: string;
  }
>(({ className, value, indicatorClassName, ...props }, ref) => {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)}
      {...props}
    >
      <Indicator value={value} className={indicatorClassName} />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

function Indicator({ value, className }: { value: number | undefined | null; className?: string }) {
  return (
    <View
      className={cn('h-full w-full flex-1 bg-primary web:transition-all', className)}
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    >
      <ProgressPrimitive.Indicator className={cn('h-full w-full ', className)} />
    </View>
  );
}
