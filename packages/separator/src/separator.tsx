import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { View } from 'react-native';
import type { RootProps, RootRef } from './types';

function Root({ ref, asChild, decorative, orientation = 'horizontal', ...props }: RootProps & { ref?: React.Ref<RootRef> }) {
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

Root.displayName = 'RootSeparator';

export { Root };
