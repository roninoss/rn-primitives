import * as React from 'react';
import { View } from 'react-native';
import * as Slot from '@rn-primitives/slot';
import type { ViewRef } from '@rn-primitives/types';
import type { SeparatorRootProps } from './types';

const Root = React.forwardRef<ViewRef, SeparatorRootProps>(
  ({ asChild, decorative, orientation = 'horizontal', ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
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
