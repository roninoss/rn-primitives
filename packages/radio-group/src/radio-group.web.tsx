import * as RadioGroup from '@radix-ui/react-radio-group';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import type { IndicatorProps, IndicatorRef, ItemProps, ItemRef, RootProps, RootRef } from './types';

const RadioGroupContext = React.createContext<RootProps | null>(null);
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  value,
  onValueChange,
  disabled = false,
  ref,
  ...viewProps
}: RootComponentProps) => {
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
type ItemComponentProps = ItemProps & React.RefAttributes<ItemRef>;

const Item = ({ asChild, value, onPress: onPressProps, ref, ...props }: ItemComponentProps) => {
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
type IndicatorComponentProps = IndicatorProps & React.RefAttributes<IndicatorRef>;

const Indicator = ({ asChild, forceMount, ref, ...props }: IndicatorComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <RadioGroup.Indicator asChild>
      <Component ref={ref} {...props} />
    </RadioGroup.Indicator>
  );
};

Indicator.displayName = 'IndicatorRadioGroup';

export { Indicator, Item, Root };
