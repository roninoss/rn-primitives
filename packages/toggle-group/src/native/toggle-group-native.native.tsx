import * as React from 'react';
import { View, Pressable } from '@rn-primitives/core/dist/native';
import { useControllableState } from '@rn-primitives/hooks';
import { ItemContext, RootContext, useItemContext, useRootContext } from '../utils/contexts';
import type { ItemProps, RootProps } from './types';
import type { GestureResponderEvent } from 'react-native';
import { getDefaultValue } from '../utils/get-default-value';
import { getIsSelected } from '../utils/get-is-selected';
import { getNewMultipleValue } from '../utils/get-new-multiple-value';
import { getNewSingleValue } from '../utils/get-new-single-value';

const Root = ({
  type,
  disabled = false,
  value: valueProp,
  onValueChange: onValueChangeProps,
  defaultValue,
  ...viewProps
}: RootProps) => {
  const [rootValue = type === 'multiple' ? [] : undefined, onRootValueChange] =
    useControllableState<(string | undefined) | string[]>({
      prop: valueProp,
      defaultProp: getDefaultValue(defaultValue, type),
      onChange: onValueChangeProps as (state: string | string[] | undefined) => void,
    });

  return (
    <RootContext.Provider
      value={{
        type,
        disabled,
        value: rootValue,
        onValueChange: onRootValueChange,
      }}
    >
      <View role='group' {...viewProps} />
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
  const { type, disabled, value, onValueChange } = useRootContext();

  function onPress(ev: GestureResponderEvent) {
    if (disabled || disabledProp) return;
    if (type === 'single') {
      onValueChange?.(getNewSingleValue(value, itemValue) as string[] & string);
    }
    if (type === 'multiple') {
      onValueChange?.(getNewMultipleValue(value, itemValue) as string[] & string);
    }
    if (typeof onPressProp === 'function') {
      onPressProp(ev);
    }
  }

  const isChecked = type === 'single' ? getIsSelected(value, itemValue) : undefined;
  const isSelected = type === 'multiple' ? getIsSelected(value, itemValue) : undefined;

  return (
    <ItemContext.Provider value={{ value: itemValue }}>
      <Pressable
        role={type === 'single' ? 'radio' : 'checkbox'}
        onPress={onPress}
        aria-checked={isChecked}
        aria-disabled={(disabled || disabledProp) ?? false}
        aria-selected={isSelected}
        disabled={(disabled || disabledProp) ?? false}
        {...props}
      />
    </ItemContext.Provider>
  );
};

export { Item, Root, useItemContext, useRootContext };
