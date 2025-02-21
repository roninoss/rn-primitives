import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import { Slot } from '@rn-primitives/slot';
import type { IndicatorProps, IndicatorRef, ItemProps, ItemRef, RootProps, RootRef } from './types';

const RadioGroupContext = React.createContext<RootProps | null>(null);

const Root = React.forwardRef<RootRef, RootProps>(
  ({ asChild, value, onValueChange, disabled = false, ...viewProps }, ref) => {
    const Component = asChild ? Slot : View;
    return (
      <RadioGroupContext.Provider
        value={{
          value,
          disabled,
          onValueChange,
        }}
      >
        <Component ref={ref} role='radiogroup' {...viewProps} />
      </RadioGroupContext.Provider>
    );
  }
);

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

interface RadioItemContext {
  itemValue: string | undefined;
}

const RadioItemContext = React.createContext<RadioItemContext | null>(null);

const Item = React.forwardRef<ItemRef, ItemProps>(
  (
    { asChild, value: itemValue, disabled: disabledProp = false, onPress: onPressProp, ...props },
    ref
  ) => {
    const { disabled, value, onValueChange } = useRadioGroupContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled || disabledProp) return;
      onValueChange(itemValue);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot : Pressable;
    return (
      <RadioItemContext.Provider
        value={{
          itemValue: itemValue,
        }}
      >
        <Component
          ref={ref}
          role='radio'
          onPress={onPress}
          aria-checked={value === itemValue}
          disabled={(disabled || disabledProp) ?? false}
          accessibilityState={{
            disabled: (disabled || disabledProp) ?? false,
            checked: value === itemValue,
          }}
          {...props}
        />
      </RadioItemContext.Provider>
    );
  }
);

Item.displayName = 'ItemRadioGroup';

function useRadioItemContext() {
  const context = React.useContext(RadioItemContext);
  if (!context) {
    throw new Error(
      'RadioItem compound components cannot be rendered outside the RadioItem component'
    );
  }
  return context;
}

const Indicator = React.forwardRef<IndicatorRef, IndicatorProps>(
  ({ asChild, forceMount, ...props }, ref) => {
    const { value } = useRadioGroupContext();
    const { itemValue } = useRadioItemContext();

    if (!forceMount) {
      if (value !== itemValue) {
        return null;
      }
    }
    const Component = asChild ? Slot : View;
    return <Component ref={ref} role='presentation' {...props} />;
  }
);

Indicator.displayName = 'IndicatorRadioGroup';

export { Indicator, Item, Root };
