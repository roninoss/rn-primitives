import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import type { RootProps, RootRef, ThumbProps, ThumbRef } from './types';

function Root({
  asChild,
  checked,
  onCheckedChange,
  disabled,
  onPress: onPressProp,
  'aria-valuetext': ariaValueText,
  ref,
  ...props
}: RootProps) {
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

function Thumb({ asChild, ref, ...props }: ThumbProps) {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='presentation' {...props} />;
}

Thumb.displayName = 'ThumbNativeSwitch';

export { Root, Thumb };
