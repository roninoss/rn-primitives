import * as Toggle from '@radix-ui/react-toggle';
import * as React from 'react';
import { Pressable, StyleSheet, type GestureResponderEvent } from 'react-native';
import * as Slot from '@rn-primitives/slot';
import type { PressableRef, SlottablePressableProps } from '@rn-primitives/types';
import type { ToggleRootProps } from './types';

const Root = React.forwardRef<PressableRef, SlottablePressableProps & ToggleRootProps>(
  ({ asChild, pressed, onPressedChange, disabled, onPress: onPressProp, style, ...props }, ref) => {
    function onPress(ev: GestureResponderEvent) {
      onPressProp?.(ev);
      onPressedChange(!pressed);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Toggle.Root pressed={pressed} onPressedChange={onPressedChange} disabled={disabled} asChild>
        <Component
          ref={ref}
          onPress={onPress}
          disabled={disabled}
          role='button'
          style={StyleSheet.flatten(style)}
          {...props}
        />
      </Toggle.Root>
    );
  }
);

Root.displayName = 'RootWebToggle';

export { Root };
