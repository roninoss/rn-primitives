import * as Toggle from '@radix-ui/react-toggle';
import * as Slot from '@rnr-method/slot';
import * as React from 'react';
import { Pressable, type GestureResponderEvent } from 'react-native';
import type { RootProps, RootRef } from './types';

const Root = React.forwardRef<RootRef, RootProps>(
  ({ asChild, pressed, onPressedChange, disabled, onPress: onPressProp, ...props }, ref) => {
    function onPress(ev: GestureResponderEvent) {
      onPressProp?.(ev);
      onPressedChange(!pressed);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Toggle.Root pressed={pressed} onPressedChange={onPressedChange} disabled={disabled} asChild>
        <Component ref={ref} onPress={onPress} disabled={disabled} role='button' {...props} />
      </Toggle.Root>
    );
  }
);

Root.displayName = 'RootWebToggle';

export { Root };
