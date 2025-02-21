import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { View } from 'react-native';
import type { RootProps, RootRef } from './types';

const Root = React.forwardRef<RootRef, RootProps>(
  ({ asChild, decorative, orientation = 'horizontal', ...props }, ref) => {
    const Component = asChild ? Slot : View;
    return (
      <Component
        role={decorative ? 'presentation' : 'separator'}
        aria-orientation={orientation}
        ref={ref}
        {...props}
      />
    );
  }
);

Root.displayName = 'RootSeparator';

export { Root };
