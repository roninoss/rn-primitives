import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { View } from 'react-native';
import type { RootProps, RootRef } from './types';

// React 19 compatible version - accepts ref as prop
function Root(props: RootProps) {
  const { asChild, decorative, orientation = 'horizontal', ref, ...otherProps } = props;
  
  if (asChild) {
    // For asChild pattern, we still need to use the slot system
    // This will be updated when we fix the slot components
    return (
      <RootLegacy 
        ref={ref as any} 
        asChild={asChild}
        decorative={decorative}
        orientation={orientation}
        {...otherProps}
      />
    );
  }
  
  // Direct implementation without slot pattern - React 19 compatible
  return (
    <View
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={orientation}
      ref={ref}
      {...otherProps}
    />
  );
}

// Legacy forwardRef implementation for asChild pattern
const RootLegacy = React.forwardRef<RootRef, RootProps>(
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
