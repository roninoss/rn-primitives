import * as Slot from '@rn-primitives/slot';
import { ToggleGroupUtils } from '@rn-primitives/utils';
import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import type { ItemProps, ItemRef, RootProps, RootRef } from './types';

const ToggleGroupContext = React.createContext<RootProps | null>(null);

function Root({ ref, asChild,
      type,
      value,
      onValueChange,
      disabled = false,
      rovingFocus: _rovingFocus,
      orientation: _orientation,
      dir: _dir,
      loop: _loop,
      ...viewProps
     }: RootProps & { ref?: React.Ref<RootRef> }) {
    const Component = asChild ? Slot.View : View;
    return (
      <ToggleGroupContext.Provider
        value={
          {
            type,
            value,
            disabled,
            onValueChange,
          } as RootProps
        }
      >
        <Component ref={ref} role='group' {...viewProps} />
      </ToggleGroupContext.Provider>
    );
  }
);

Root.displayName = 'RootToggleGroup';

function useRootContext() {
  const context = React.useContext(ToggleGroupContext);
  if (!context) {
    throw new Error(
      'ToggleGroup compound components cannot be rendered outside the ToggleGroup component'
    );
  }
  return context;
}

const ItemContext = React.createContext<ItemProps | null>(null);

function Item({ ref, asChild, value: itemValue, disabled: disabledProp = false, onPress: onPressProp, ...props  }: ItemProps & { ref?: React.Ref<ItemRef> }) {
    const id = React.useId();
    const { type, disabled, value, onValueChange } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled || disabledProp) return;
      if (type === 'single') {
        onValueChange(ToggleGroupUtils.getNewSingleValue(value, itemValue));
      }
      if (type === 'multiple') {
        onValueChange(ToggleGroupUtils.getNewMultipleValue(value, itemValue));
      }
      onPressProp?.(ev);
    }

    const isChecked =
      type === 'single' ? ToggleGroupUtils.getIsSelected(value, itemValue) : undefined;
    const isSelected =
      type === 'multiple' ? ToggleGroupUtils.getIsSelected(value, itemValue) : undefined;

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <ItemContext.Provider value={{ value: itemValue }}>
        <Component
          ref={ref}
          aria-disabled={disabled}
          role={type === 'single' ? 'radio' : 'checkbox'}
          onPress={onPress}
          aria-checked={isChecked}
          aria-selected={isSelected}
          disabled={(disabled || disabledProp) ?? false}
          accessibilityState={{
            disabled: (disabled || disabledProp) ?? false,
            checked: isChecked,
            selected: isSelected,
          }}
          {...props}
        />
      </ItemContext.Provider>
    );
  }
);

Item.displayName = 'ItemToggleGroup';

function useItemContext() {
  const context = React.useContext(ItemContext);
  if (!context) {
    throw new Error(
      'ToggleGroupItem compound components cannot be rendered outside the ToggleGroupItem component'
    );
  }
  return context;
}

const utils = ToggleGroupUtils;

export { Item, Root, useItemContext, useRootContext, utils };
