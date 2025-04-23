import * as React from 'react';
import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import { Platform } from '@rn-primitives/core';
import { mergeProps } from '@rn-primitives/utils';
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
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='10'
          height='10'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='3.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='text-primary-foreground'
        >
          <path
            fill='none'
            stroke='currentColor'
            strokeWidth='3.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M20 6 9 17l-5-5'
            className='text-primary-foreground'
          ></path>
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
