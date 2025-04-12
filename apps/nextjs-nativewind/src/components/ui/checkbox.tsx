import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import { Platform } from '@rn-primitives/core';
import { mergeProps } from '@rn-primitives/utils';
import { Check } from '~/lib/icons/Check';
import { cn } from '~/lib/utils';

const CHECKBOX_NATIVE_PROPS = {
  hitSlop: 10,
};

function Checkbox({ className, native, ...props }: CheckboxPrimitive.RootProps) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'rounded shrink-0 border border-primary disabled:opacity-50',
        Platform.select({
          web: 'h-4 w-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed',
          native: 'h-5 w-5',
        }),
        className
      )}
      native={mergeProps(CHECKBOX_NATIVE_PROPS, native)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center h-full w-full bg-primary')}
      >
        <Check size={10} strokeWidth={3.5} className='text-primary-foreground' />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
