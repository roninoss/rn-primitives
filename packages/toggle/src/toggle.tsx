import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, type GestureResponderEvent } from 'react-native';
import type { RootProps, RootRef } from './types';

function Root({ ref, asChild, pressed, onPressedChange, disabled, onPress: onPressProp, ...props  }: RootProps & { ref?: React.Ref<RootRef> }) {
    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      const newValue = !pressed;
      onPressedChange(newValue);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
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
  }
);

Root.displayName = 'RootNativeToggle';

export { Root };
