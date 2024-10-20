import * as Slot from '@rn-primitives/slot';
import type { PressableRef, ViewRef } from '@rn-primitives/types';
import { ToggleGroupUtils } from '@rn-primitives/utils';
import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import type {
  ToolbarButtonProps,
  ToolbarLinkProps,
  ToolbarRootProps,
  ToolbarSeparatorProps,
  ToolbarToggleGroupProps,
  ToolbarToggleItem,
} from './types';

const Root = React.forwardRef<ViewRef, ToolbarRootProps>(
  ({ asChild, orientation: _orientation, dir: _dir, loop: _loop, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return <Component ref={ref} role='toolbar' {...props} />;
  }
);

Root.displayName = 'RootNativeToolbar';

const ToggleGroupContext = React.createContext<ToolbarToggleGroupProps | null>(null);

const ToggleGroup = React.forwardRef<ViewRef, ToolbarToggleGroupProps>(
  ({ asChild, type, value, onValueChange, disabled = false, ...viewProps }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <ToggleGroupContext.Provider
        value={
          {
            type,
            value,
            disabled,
            onValueChange,
          } as ToolbarToggleGroupProps
        }
      >
        <Component ref={ref} role='group' {...viewProps} />
      </ToggleGroupContext.Provider>
    );
  }
);

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

const ToggleItem = React.forwardRef<PressableRef, ToolbarToggleItem>(
  (
    { asChild, value: itemValue, disabled: disabledProp = false, onPress: onPressProp, ...props },
    ref
  ) => {
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
);

ToggleItem.displayName = 'ToggleItemNativeToolbar';

const Separator = React.forwardRef<ViewRef, ToolbarSeparatorProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component role={'separator'} ref={ref} {...props} />;
});

Separator.displayName = 'SeparatorNativeToolbar';

const Link = React.forwardRef<PressableRef, ToolbarLinkProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return <Component ref={ref} role='link' {...props} />;
});

Link.displayName = 'LinkNativeToolbar';

const Button = React.forwardRef<PressableRef, ToolbarButtonProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return <Component ref={ref} role='button' {...props} />;
});

export { Button, Link, Root, Separator, ToggleGroup, ToggleItem };
