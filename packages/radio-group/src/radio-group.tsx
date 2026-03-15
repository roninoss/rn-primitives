import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import { Slot } from '@rn-primitives/slot';
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
type ItemComponentProps = ItemProps & React.RefAttributes<ItemRef>;

const Item = ({
  asChild,
  value: itemValue,
  disabled: disabledProp = false,
  onPress: onPressProp,
  ref,
  ...props
}: ItemComponentProps) => {
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
type IndicatorComponentProps = IndicatorProps & React.RefAttributes<IndicatorRef>;

const Indicator = ({ asChild, forceMount, ref, ...props }: IndicatorComponentProps) => {
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
