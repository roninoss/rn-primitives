import { Pressable } from '@rn-primitives/core/dist/native';
import * as React from 'react';
import type { GestureResponderEvent } from 'react-native';
import type { RootProps } from './types';

const Root = ({
  asChild,
  pressed,
  onPressedChange,
  disabled,
  onPress: onPressProp,
  ...props
}: RootProps) => {
  const onPress = (ev: GestureResponderEvent) => {
    if (disabled) return;

    if (typeof onPressedChange === 'function') {
      const newValue = !pressed;
      onPressedChange(newValue);
    }

    if (typeof onPressProp === 'function') {
      onPressProp(ev);
    }
  };

  return (
    <Pressable
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

export { Root };
