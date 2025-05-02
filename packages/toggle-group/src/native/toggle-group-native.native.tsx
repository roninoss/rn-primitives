import { Pressable, View } from '@rn-primitives/core/dist/native';
import { useControllableState } from '@rn-primitives/hooks';
import * as React from 'react';
import type { GestureResponderEvent } from 'react-native';
import { ItemContext, RootContext, useItemContext, useRootContext } from '../utils/contexts';
import { getDefaultValue } from '../utils/get-default-value';
import { getIsSelected } from '../utils/get-is-selected';
import { getNewMultipleValue } from '../utils/get-new-multiple-value';
import { getNewSingleValue } from '../utils/get-new-single-value';
import type { ItemProps, RootProps } from './types';

function Root({
  type,
  disabled = false,
  value: valueProp,
  onValueChange: onValueChangeProps,
  defaultValue,
  ...viewProps
}: RootProps) {
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
}

function Item({
  asChild,
  value: itemValue,
  disabled: disabledProp = false,
  onPress: onPressProp,
  ...props
}: ItemProps) {
  const { type, disabled, value, onValueChange } = useRootContext();

  const onPress = React.useCallback(
    (ev: GestureResponderEvent) => {
      if (type === 'single') {
        onValueChange?.(getNewSingleValue(value, itemValue) as string[] & string);
      }
      if (type === 'multiple') {
        onValueChange?.(getNewMultipleValue(value, itemValue) as string[] & string);
      }
      if (typeof onPressProp === 'function') {
        onPressProp(ev);
      }
    },
    [type, value, itemValue, onValueChange, onPressProp]
  );

  const isSelected = React.useMemo(() => {
    return getIsSelected(value, itemValue);
  }, [value, itemValue]);

  return (
    <ItemContext.Provider value={{ value: itemValue }}>
      <Pressable
        role={type === 'single' ? 'radio' : 'checkbox'}
        onPress={onPress}
        aria-checked={type === 'single' ? isSelected : isSelected}
        aria-disabled={(disabled || disabledProp) ?? false}
        aria-selected={type === 'multiple' ? isSelected : undefined}
        disabled={(disabled || disabledProp) ?? false}
        {...props}
      />
    </ItemContext.Provider>
  );
}

export { Item, Root, useItemContext, useRootContext };
