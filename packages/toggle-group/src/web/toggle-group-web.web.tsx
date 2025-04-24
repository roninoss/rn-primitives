import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as React from 'react';
import { View, Pressable } from '@rn-primitives/core/dist/web';
import { ItemContext, RootContext, useItemContext, useRootContext } from '../utils/contexts';
import { getNewMultipleValue } from '../utils/get-new-multiple-value';
import { getNewSingleValue } from '../utils/get-new-single-value';
import type { GestureResponderEvent } from 'react-native';
import type { ItemProps, RootProps } from './types';

const Root = ({
  asChild,
  type,
  value,
  onValueChange,
  disabled = false,
  rovingFocus,
  orientation,
  dir,
  loop,
  ...props
}: RootProps) => {
  return (
    <RootContext.Provider
      value={{
        type,
        value,
        disabled,
        onValueChange,
      }}
    >
      <ToggleGroup.Root
        type={type as any}
        value={value as any}
        onValueChange={onValueChange as any}
        disabled={disabled}
        rovingFocus={rovingFocus}
        orientation={orientation}
        dir={dir}
        loop={loop}
        asChild
      >
        <View {...props} />
      </ToggleGroup.Root>
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
    onPressProp?.(ev);
    if (type === 'single') {
      onValueChange(getNewSingleValue(value, itemValue));
    }
    if (type === 'multiple') {
      onValueChange(getNewMultipleValue(value, itemValue));
    }
  }

  return (
    <ItemContext.Provider value={{ value: itemValue }}>
      <ToggleGroup.Item value={itemValue} asChild>
        <Pressable onPress={onPress} disabled={disabled || disabledProp} role='button' {...props} />
      </ToggleGroup.Item>
    </ItemContext.Provider>
  );
};

export { Item, Root, useItemContext, useRootContext };
