import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { View } from 'react-native';
import type { RootProps, RootRef } from './types';
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  decorative,
  orientation = 'horizontal',
  ref,
  ...props
}: RootComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <Component
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={orientation}
      ref={ref}
      {...props}
    />
  );
};

Root.displayName = 'RootSeparator';

export { Root };
