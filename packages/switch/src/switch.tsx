import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import type { RootProps, RootRef, ThumbProps, ThumbRef } from './types';

function Root({ ref, asChild, checked, onCheckedChange, disabled, onPress: onPressProp, 'aria-valuetext': ariaValueText, ...props }: RootProps & { ref?: React.Ref<RootRef> }) {
  function onPress(ev: GestureResponderEvent) {
    if (disabled) return;
    onCheckedChange(!checked);
    onPressProp?.(ev);
  }

  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <Component
      ref={ref}
      aria-disabled={disabled}
      role='switch'
      aria-checked={checked}
      aria-valuetext={ariaValueText ?? checked ? 'on' : 'off'}
      onPress={onPress}
      accessibilityState={{
        checked,
        disabled,
      }}
      disabled={disabled}
      {...props}
    />
  );
}

Root.displayName = 'RootNativeSwitch';

function Thumb({ ref, asChild, ...props }: ThumbProps & { ref?: React.Ref<ThumbRef> }) {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='presentation' {...props} />;
}

Thumb.displayName = 'ThumbNativeSwitch';

export { Root, Thumb };
