import * as LabelPrimitive from '@rn-primitives/label';
import * as React from 'react';
import { cn } from '~/lib/utils';

const Label = ({
  className,
  native,
  ...props
}: Pick<LabelPrimitive.RootProps, 'for' | 'native'> & LabelPrimitive.TextProps) => (
  <LabelPrimitive.Root className='web:cursor-default' native={native}>
    <LabelPrimitive.Text
      className={cn(
        'text-sm text-foreground native:text-base font-medium leading-none web:peer-disabled:cursor-not-allowed web:peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  </LabelPrimitive.Root>
);

export { Label };
