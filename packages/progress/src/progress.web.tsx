import * as Progress from '@radix-ui/react-progress';
import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { View } from 'react-native';
import type { IndicatorProps, IndicatorRef, RootProps, RootRef } from './types';

const ProgressContext = React.createContext<RootProps | null>(null);

function Root({ ref, asChild, value, max, getValueLabel, ...props  }: RootProps & { ref?: React.Ref<RootRef> }) {
    const Component = asChild ? Slot.View : View;
    return (
      <ProgressContext.Provider value={{ value, max }}>
        <Progress.Root value={value} max={max} getValueLabel={getValueLabel} asChild>
          <Component ref={ref} {...props} />
        </Progress.Root>
      </ProgressContext.Provider>
    );
  }

Root.displayName = 'RootProgress';

function Indicator({ ref, asChild, ...props  }: IndicatorProps & { ref?: React.Ref<IndicatorRef> }) {
  const Component = asChild ? Slot.View : View;
  return (
    <Progress.Indicator asChild>
      <Component ref={ref} {...props} />
    </Progress.Indicator>
  );
}

Indicator.displayName = 'IndicatorProgress';

export { Indicator, Root };
