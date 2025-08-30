import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { View } from 'react-native';
import type { IndicatorProps, IndicatorRef, RootProps, RootRef } from './types';

// This project uses code from WorkOS/Radix Primitives.
// The code is licensed under the MIT License.
// https://github.com/radix-ui/primitives/tree/main

const DEFAULT_MAX = 100;

function Root({ ref, asChild, value: valueProp, max: maxProp, getValueLabel = defaultGetValueLabel, ...props }: RootProps & { ref?: React.Ref<RootRef> }) {
    const max = maxProp ?? DEFAULT_MAX;
    const value = isValidValueNumber(valueProp, max) ? valueProp : 0;

    const Component = asChild ? Slot.View : View;
    return (
      <Component
        role='progressbar'
        ref={ref}
        aria-valuemax={max}
        aria-valuemin={0}
        aria-valuenow={value}
        aria-valuetext={getValueLabel(value, max)}
        accessibilityValue={{
          min: 0,
          max,
          now: value,
          text: getValueLabel(value, max),
        }}
        {...props}
      />
    );
  }

Root.displayName = 'RootProgress';

function Indicator({ ref, asChild, ...props }: IndicatorProps & { ref?: React.Ref<IndicatorRef> }) {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='presentation' {...props} />;
}

Indicator.displayName = 'IndicatorProgress';

export { Indicator, Root };

function defaultGetValueLabel(value: number, max: number) {
  return `${Math.round((value / max) * 100)}%`;
}

function isValidValueNumber(value: any, max: number): value is number {
  return typeof value === 'number' && !isNaN(value) && value <= max && value >= 0;
}
