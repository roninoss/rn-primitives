import * as RadioGroup from '@radix-ui/react-radio-group';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import type { IndicatorProps, IndicatorRef, ItemProps, ItemRef, RootProps, RootRef } from './types';

const RadioGroupContext = React.createContext<RootProps | null>(null);

const Root = (
  {
    ref,
    asChild,
    value,
    onValueChange,
    disabled = false,
    ...viewProps
  }: RootProps & {
    ref: React.RefObject<RootRef>;
  }
) => {
  const Component = asChild ? Slot : View;
  return (
    <RadioGroupContext.Provider
      value={{
        value,
        disabled,
        onValueChange,
      }}
    >
      <RadioGroup.Root value={value} onValueChange={onValueChange} disabled={disabled} asChild>
        <Component ref={ref} {...viewProps} />
      </RadioGroup.Root>
    </RadioGroupContext.Provider>
  );
};

Root.displayName = 'RootRadioGroup';
function useRadioGroupContext() {
  const context = React.useContext(RadioGroupContext);
  if (!context) {
    throw new Error(
      'RadioGroup compound components cannot be rendered outside the RadioGroup component'
    );
  }
  return context;
}
const Item = (
  {
    ref,
    asChild,
    value,
    onPress: onPressProps,
    ...props
  }: ItemProps & {
    ref: React.RefObject<ItemRef>;
  }
) => {
  const { onValueChange } = useRadioGroupContext();

  function onPress(ev: GestureResponderEvent) {
    if (onPressProps) {
      onPressProps(ev);
    }
    onValueChange(value);
  }

  const Component = asChild ? Slot : Pressable;
  return (
    <RadioGroup.Item value={value} asChild>
      <Component ref={ref} onPress={onPress} {...props} />
    </RadioGroup.Item>
  );
};

Item.displayName = 'ItemRadioGroup';

const Indicator = (
  {
    ref,
    asChild,
    forceMount,
    ...props
  }: IndicatorProps & {
    ref: React.RefObject<IndicatorRef>;
  }
) => {
  const Component = asChild ? Slot : View;
  return (
    <RadioGroup.Indicator asChild>
      <Component ref={ref} {...props} />
    </RadioGroup.Indicator>
  );
};

Indicator.displayName = 'IndicatorRadioGroup';

export { Indicator, Item, Root };
