import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, type GestureResponderEvent } from 'react-native';
import type { RootProps, RootRef } from './types';
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  pressed,
  onPressedChange,
  disabled,
  onPress: onPressProp,
  ref,
  ...props
}: RootComponentProps) => {
  function onPress(ev: GestureResponderEvent) {
    if (disabled) return;
    const newValue = !pressed;
    onPressedChange(newValue);
    onPressProp?.(ev);
  }

  const Component = asChild ? Slot : Pressable;
  return (
    <Component
      ref={ref}
      aria-disabled={disabled}
      role='switch'
      aria-selected={pressed}
      onPress={onPress}
      accessibilityState={{
        selected: pressed,
        disabled,
      }}
      disabled={disabled}
      {...props}
    />
  );
};

Root.displayName = 'RootNativeToggle';

export { Root };
