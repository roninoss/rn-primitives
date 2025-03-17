import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import { Slot } from '@rn-primitives/slot';
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
      <Component ref={ref} role='radiogroup' {...viewProps} />
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

interface RadioItemContext {
  itemValue: string | undefined;
}

const RadioItemContext = React.createContext<RadioItemContext | null>(null);

const Item = (
  {
    ref,
    asChild,
    value: itemValue,
    disabled: disabledProp = false,
    onPress: onPressProp,
    ...props
  }: ItemProps & {
    ref: React.RefObject<ItemRef>;
  }
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
};

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
  const { value } = useRadioGroupContext();
  const { itemValue } = useRadioItemContext();

  if (!forceMount) {
    if (value !== itemValue) {
      return null;
    }
  }
  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='presentation' {...props} />;
};

Indicator.displayName = 'IndicatorRadioGroup';

export { Indicator, Item, Root };
