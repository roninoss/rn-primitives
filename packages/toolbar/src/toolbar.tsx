import { Slot } from '@rn-primitives/slot';
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
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  orientation: _orientation,
  dir: _dir,
  loop: _loop,
  ref,
  ...props
}: RootComponentProps) => {
  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='toolbar' {...props} />;
};

Root.displayName = 'RootNativeToolbar';

const ToggleGroupContext = React.createContext<ToggleGroupProps | null>(null);
type ToggleGroupComponentProps = ToggleGroupProps & React.RefAttributes<ToggleGroupRef>;

const ToggleGroup = ({
  asChild,
  type,
  value,
  onValueChange,
  disabled = false,
  ref,
  ...viewProps
}: ToggleGroupComponentProps) => {
  const Component = asChild ? Slot : View;
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
};

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
type ToggleItemComponentProps = ToggleItemProps & React.RefAttributes<ToggleItemRef>;

const ToggleItem = ({
  asChild,
  value: itemValue,
  disabled: disabledProp = false,
  onPress: onPressProp,
  ref,
  ...props
}: ToggleItemComponentProps) => {
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

  const Component = asChild ? Slot : Pressable;
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
};

ToggleItem.displayName = 'ToggleItemNativeToolbar';
type SeparatorComponentProps = SeparatorProps & React.RefAttributes<SeparatorRef>;

const Separator = ({ asChild, ref, ...props }: SeparatorComponentProps) => {
  const Component = asChild ? Slot : View;
  return <Component role={'separator'} ref={ref} {...props} />;
};

Separator.displayName = 'SeparatorNativeToolbar';
type LinkComponentProps = LinkProps & React.RefAttributes<LinkRef>;

const Link = ({ asChild, ref, ...props }: LinkComponentProps) => {
  const Component = asChild ? Slot : Pressable;
  return <Component ref={ref} role='link' {...props} />;
};

Link.displayName = 'LinkNativeToolbar';
type ButtonComponentProps = ButtonProps & React.RefAttributes<ButtonRef>;

const Button = ({ asChild, ref, ...props }: ButtonComponentProps) => {
  const Component = asChild ? Slot : Pressable;
  return <Component ref={ref} role='button' {...props} />;
};

export { Button, Link, Root, Separator, ToggleGroup, ToggleItem };
