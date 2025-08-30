import * as Slot from '@rn-primitives/slot';
import { ToggleGroupUtils } from '@rn-primitives/utils';
import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import type {
  ButtonProps,
  ButtonRef,
  LinkProps,
  LinkRef,
  RootProps,
  RootRef,
  SeparatorProps,
  SeparatorRef,
  ToggleGroupProps,
  ToggleGroupRef,
  ToggleItemProps,
  ToggleItemRef,
} from './types';

function Root({ ref, asChild, orientation: _orientation, dir: _dir, loop: _loop, ...props  }: RootProps & { ref?: React.Ref<RootRef> }) {
    const Component = asChild ? Slot.View : View;
    return <Component ref={ref} role='toolbar' {...props} />;
  }

Root.displayName = 'RootNativeToolbar';

const ToggleGroupContext = React.createContext<ToggleGroupProps | null>(null);

function ToggleGroup({ ref, asChild, type, value, onValueChange, disabled = false, ...viewProps  }: ToggleGroupProps & { ref?: React.Ref<ToggleGroupRef> }) {
    const Component = asChild ? Slot.View : View;
    return (
      <ToggleGroupContext.Provider
        value={
          {
            type,
            value,
            disabled,
            onValueChange,
          } as ToggleGroupProps
        }
      >
        <Component ref={ref} role='group' {...viewProps} />
      </ToggleGroupContext.Provider>
    );
  }

ToggleGroup.displayName = 'ToggleGroupNativeToolbar';

function useToggleGroupContext() {
  const context = React.useContext(ToggleGroupContext);
  if (!context) {
    throw new Error(
      'ToggleGroup compound components cannot be rendered outside the ToggleGroup component'
    );
  }
  return context;
}

function ToggleItem({ ref, asChild, value: itemValue, disabled: disabledProp = false, onPress: onPressProp, ...props  }: ToggleItemProps & { ref?: React.Ref<ToggleItemRef> }) {
    const { type, disabled, value, onValueChange } = useToggleGroupContext();

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
    );
  }

ToggleItem.displayName = 'ToggleItemNativeToolbar';

function Separator({ ref, asChild, ...props  }: SeparatorProps & { ref?: React.Ref<SeparatorRef> }) {
  const Component = asChild ? Slot.View : View;
  return <Component role={'separator'} ref={ref} {...props} />;
}

Separator.displayName = 'SeparatorNativeToolbar';

function Link({ ref, asChild, ...props  }: LinkProps & { ref?: React.Ref<LinkRef> }) {
  const Component = asChild ? Slot.Pressable : Pressable;
  return <Component ref={ref} role='link' {...props} />;
}

Link.displayName = 'LinkNativeToolbar';

function Button({ ref, asChild, ...props  }: ButtonProps & { ref?: React.Ref<ButtonRef> }) {
  const Component = asChild ? Slot.Pressable : Pressable;
  return <Component ref={ref} role='button' {...props} />;
}

export { Button, Link, Root, Separator, ToggleGroup, ToggleItem };
