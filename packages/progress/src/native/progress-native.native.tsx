import { View } from '@rn-primitives/core/dist/native';
import type { IndicatorProps, RootProps } from './types';

const DEFAULT_MAX = 100;

function Root({
  value: valueProp,
  max: maxProp,
  getValueLabel = defaultGetValueLabel,
  ...props
}: RootProps) {
  const max = maxProp ?? DEFAULT_MAX;
  const value = isValidValueNumber(valueProp, max) ? valueProp : 0;

  return (
    <View
      role='progressbar'
      aria-valuemax={max}
      aria-valuemin={0}
      aria-valuenow={value}
      aria-valuetext={getValueLabel(value, max)}
      {...props}
    />
  );
}

function Indicator(props: IndicatorProps) {
  return <View role='presentation' {...props} />;
}

export { Indicator, Root };

function defaultGetValueLabel(value: number, max: number) {
  return `${Math.round((value / max) * 100)}%`;
}

function isValidValueNumber(value: any, max: number): value is number {
  return typeof value === 'number' && !isNaN(value) && value <= max && value >= 0;
}
