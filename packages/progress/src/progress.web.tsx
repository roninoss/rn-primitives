import * as Progress from '@radix-ui/react-progress';
import * as Slot from '@rn-primitives/slot';
import type { ViewRef } from '@rn-primitives/types';
import * as React from 'react';
import { View } from 'react-native';
import type { ProgressIndicatorProps, ProgressRootProps } from './types';

const ProgressContext = React.createContext<ProgressRootProps | null>(null);

const Root = React.forwardRef<ViewRef, ProgressRootProps>(
  ({ asChild, value, max, getValueLabel, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <ProgressContext.Provider value={{ value, max }}>
        <Progress.Root value={value} max={max} getValueLabel={getValueLabel} asChild>
          <Component ref={ref} {...props} />
        </Progress.Root>
      </ProgressContext.Provider>
    );
  }
);

Root.displayName = 'RootProgress';

const Indicator = React.forwardRef<ViewRef, ProgressIndicatorProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <Progress.Indicator asChild>
        <Component ref={ref} {...props} />
      </Progress.Indicator>
    );
  }
);

Indicator.displayName = 'IndicatorProgress';

export { Indicator, Root };
