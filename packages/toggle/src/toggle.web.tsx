import * as Toggle from '@radix-ui/react-toggle';
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
    onPressProp?.(ev);
    onPressedChange(!pressed);
  }

  const Component = asChild ? Slot : Pressable;
  return (
    <Toggle.Root pressed={pressed} onPressedChange={onPressedChange} disabled={disabled} asChild>
      <Component ref={ref} onPress={onPress} disabled={disabled} role='button' {...props} />
    </Toggle.Root>
  );
};

Root.displayName = 'RootWebToggle';

export { Root };
