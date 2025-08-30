import * as ToggleGroup from '@radix-ui/react-toggle-group';
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
      rovingFocus,
      orientation,
      dir,
      loop,
      ...viewProps }: RootProps & { ref?: React.Ref<RootRef> }) {
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
          <Component ref={ref} {...viewProps} />
        </ToggleGroup.Root>
      </ToggleGroupContext.Provider>
    );
  }

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

function Item({ ref, asChild, value: itemValue, disabled: disabledProp = false, onPress: onPressProp, ...props }: ItemProps & { ref?: React.Ref<ItemRef> }) {
    const { type, disabled, value, onValueChange } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      onPressProp?.(ev);
      if (type === 'single') {
        onValueChange(ToggleGroupUtils.getNewSingleValue(value, itemValue));
      }
      if (type === 'multiple') {
        onValueChange(ToggleGroupUtils.getNewMultipleValue(value, itemValue));
      }
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <ItemContext.Provider value={{ value: itemValue }}>
        <ToggleGroup.Item value={itemValue} asChild>
          <Component
            ref={ref}
            onPress={onPress}
            disabled={disabled || disabledProp}
            role='button'
            {...props}
          />
        </ToggleGroup.Item>
      </ItemContext.Provider>
    );
  }

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
