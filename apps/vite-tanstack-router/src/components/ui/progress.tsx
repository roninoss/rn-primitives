import * as ProgressPrimitive from '@rn-primitives/progress';
import { View } from '@rn-primitives/core';
import { cn } from '@/lib/utils';

const Progress = ({
  className,
  value,
  indicatorClassName,
  ...props
}: ProgressPrimitive.RootProps & {
  indicatorClassName?: string;
}) => {
  return (
    <ProgressPrimitive.Root
      className={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)}
      {...props}
    >
      <Indicator value={value} className={indicatorClassName} />
    </ProgressPrimitive.Root>
  );
};

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
