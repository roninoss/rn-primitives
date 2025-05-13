import * as LabelPrimitive from '@rn-primitives/label';
import { cn } from '~/lib/utils';

const Label = ({
  className,
  ...props
}: Pick<LabelPrimitive.RootProps, 'for'> & LabelPrimitive.TextProps) => (
  <LabelPrimitive.Root className='web:cursor-default'>
    <LabelPrimitive.Text
      className={cn(
        'text-sm text-foreground font-medium leading-none web:peer-disabled:cursor-not-allowed web:peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  </LabelPrimitive.Root>
);

export { Label };
