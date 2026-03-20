import * as Progress from '@radix-ui/react-progress';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { View } from 'react-native';
import type { IndicatorProps, IndicatorRef, RootProps, RootRef } from './types';

const ProgressContext = React.createContext<RootProps | null>(null);
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({ asChild, value, max, getValueLabel, ref, ...props }: RootComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <ProgressContext.Provider value={{ value, max }}>
      <Progress.Root value={value} max={max} getValueLabel={getValueLabel} asChild>
        <Component ref={ref} {...props} />
      </Progress.Root>
    </ProgressContext.Provider>
  );
};

Root.displayName = 'RootProgress';
type IndicatorComponentProps = IndicatorProps & React.RefAttributes<IndicatorRef>;

const Indicator = ({ asChild, ref, ...props }: IndicatorComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <Progress.Indicator asChild>
      <Component ref={ref} {...props} />
    </Progress.Indicator>
  );
};

Indicator.displayName = 'IndicatorProgress';

export { Indicator, Root };
