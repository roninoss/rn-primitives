import { Pressable, View } from '@rn-primitives/core/dist/native';
import { useControllableState } from '@rn-primitives/hooks';
import * as React from 'react';
import type { GestureResponderEvent } from 'react-native';
import { ItemContext, RootContext, useItemContext, useRootContext } from '../utils/contexts';
import { getDefaultValue } from '../utils/get-default-value';
import { isItemExpanded } from '../utils/is-item-expanded';
import type { ContentProps, HeaderProps, ItemProps, RootProps, TriggerProps } from './types';

function Root({
  type,
  disabled = false,
  collapsible = true,
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
        collapsible,
        rootValue,
        onRootValueChange,
      }}
    >
      <View {...viewProps} />
    </RootContext.Provider>
  );
}

const ItemInternalContext = React.createContext<{ nativeID: string } | null>(null);

function Item({ value: itemValue, disabled, ...viewProps }: ItemProps) {
  const { rootValue } = useRootContext();
  const nativeID = React.useId();

  return (
    <ItemInternalContext.Provider value={{ nativeID }}>
      <ItemContext.Provider
        value={{
          itemValue,
          disabled,
          isExpanded: isItemExpanded(rootValue, itemValue),
        }}
      >
        <View {...viewProps} />
      </ItemContext.Provider>
    </ItemInternalContext.Provider>
  );
}

function useItemInternalContext() {
  const context = React.useContext(ItemInternalContext);
  if (!context) {
    throw new Error(
      'AccordionItem Internal compound components cannot be rendered outside the AccordionItem component'
    );
  }
  return context;
}

function Header(props: HeaderProps) {
  const { disabled: rootDisabled } = useRootContext();
  const { disabled: itemDisabled, isExpanded } = useItemContext();

  return (
    <View
      role='heading'
      aria-expanded={isExpanded}
      aria-disabled={rootDisabled ?? itemDisabled}
      {...props}
    />
  );
}

function Trigger({ onPress: onPressProp, disabled: disabledProp, ...props }: TriggerProps) {
  const {
    disabled: rootDisabled,
    type,
    onRootValueChange,
    rootValue,
    collapsible,
  } = useRootContext();
  const { disabled: itemDisabled, itemValue, isExpanded } = useItemContext();
  const { nativeID } = useItemInternalContext();

  const onPress = React.useCallback(
    (ev: GestureResponderEvent) => {
      if (type === 'single') {
        const newValue = collapsible
          ? itemValue === rootValue
            ? undefined
            : itemValue
          : itemValue;
        onRootValueChange?.(newValue as string[] & string);
      }
      if (type === 'multiple') {
        const rootToArray = toStringArray(rootValue);
        const newValue = collapsible
          ? rootToArray.includes(itemValue)
            ? rootToArray.filter((val) => val !== itemValue)
            : rootToArray.concat(itemValue)
          : [...new Set(rootToArray.concat(itemValue))];
        onRootValueChange?.(newValue as string[] & string);
      }
      if (typeof onPressProp === 'function') {
        onPressProp(ev);
      }
    },
    [onPressProp, itemValue, rootValue, collapsible, type, onRootValueChange]
  );

  const isDisabled = !!(disabledProp || rootDisabled || itemDisabled);

  return (
    <Pressable
      nativeID={nativeID}
      aria-disabled={isDisabled}
      role='button'
      onPress={onPress}
      aria-expanded={isExpanded}
      disabled={isDisabled}
      {...props}
    />
  );
}

function Content({ forceMount, ...props }: ContentProps) {
  const { type } = useRootContext();
  const { isExpanded } = useItemContext();
  const { nativeID } = useItemInternalContext();

  if (!forceMount) {
    if (!isExpanded) {
      return null;
    }
  }

  return (
    <View
      aria-hidden={!(forceMount || isExpanded)}
      aria-labelledby={nativeID}
      role={type === 'single' ? 'region' : 'summary'}
      {...props}
    />
  );
}

export { Content, Header, Item, Root, Trigger, useItemContext, useRootContext };

function toStringArray(value?: string | string[]) {
  return Array.isArray(value) ? value : value ? [value] : [];
}
