import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import type { IndicatorProps, IndicatorRef, ItemProps, ItemRef, RootProps, RootRef } from './types';

const RadioGroupContext = React.createContext<RootProps | null>(null);

function Root({ ref, asChild, value, onValueChange, disabled = false, ...viewProps }: RootProps & { ref?: React.Ref<RootRef> }) {
    const Component = asChild ? Slot.View : View;
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
  }

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
function Item({ ref, asChild, value, onPress: onPressProps, ...props }: ItemProps & { ref?: React.Ref<ItemRef> }) {
    const { onValueChange } = useRadioGroupContext();

    function onPress(ev: GestureResponderEvent) {
      if (onPressProps) {
        onPressProps(ev);
      }
      onValueChange(value);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <RadioGroup.Item value={value} asChild>
        <Component ref={ref} onPress={onPress} {...props} />
      </RadioGroup.Item>
    );
  }

Item.displayName = 'ItemRadioGroup';

function Indicator({ ref, asChild, forceMount, ...props }: IndicatorProps & { ref?: React.Ref<IndicatorRef> }) {
    const Component = asChild ? Slot.View : View;
    return (
      <RadioGroup.Indicator asChild>
        <Component ref={ref} {...props} />
      </RadioGroup.Indicator>
    );
  }

Indicator.displayName = 'IndicatorRadioGroup';

export { Indicator, Item, Root };
