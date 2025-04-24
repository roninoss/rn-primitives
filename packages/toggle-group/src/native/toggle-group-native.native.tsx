import * as React from 'react';
import { View, Pressable } from '@rn-primitives/core/dist/native';
import { ItemContext, RootContext, useItemContext, useRootContext } from '../utils/contexts';
import type { ItemProps, RootProps } from './types';
import type { GestureResponderEvent } from 'react-native';
import { getIsSelected } from '../utils/get-is-selected';
import { getNewMultipleValue } from '../utils/get-new-multiple-value';
import { getNewSingleValue } from '../utils/get-new-single-value';

const Root = ({ asChild, type, value, onValueChange, disabled = false, ...props }: RootProps) => {
  return (
    <RootContext.Provider
      value={{
        type,
        value,
        disabled,
        onValueChange,
      }}
    >
      <View role='group' {...props} />
    </RootContext.Provider>
  );
};

const Item = ({
  asChild,
  value: itemValue,
  disabled: disabledProp = false,
  onPress: onPressProp,
  ...props
}: ItemProps) => {
  const id = React.useId();
  const { type, disabled, value, onValueChange } = useRootContext();

  function onPress(ev: GestureResponderEvent) {
    if (disabled || disabledProp) return;
    if (type === 'single') {
      onValueChange(getNewSingleValue(value, itemValue));
    }
    if (type === 'multiple') {
      onValueChange(getNewMultipleValue(value, itemValue));
    }
    onPressProp?.(ev);
  }

  const isChecked = type === 'single' ? getIsSelected(value, itemValue) : undefined;
  const isSelected = type === 'multiple' ? getIsSelected(value, itemValue) : undefined;

  return (
    <ItemContext.Provider value={{ value: itemValue }}>
      <Pressable
        role={type === 'single' ? 'radio' : 'checkbox'}
        onPress={onPress}
        aria-checked={isChecked}
        aria-disabled={disabled}
        aria-selected={isSelected}
        disabled={(disabled || disabledProp) ?? false}
        {...props}
      />
    </ItemContext.Provider>
  );
};

export { Item, Root, useItemContext, useRootContext };
