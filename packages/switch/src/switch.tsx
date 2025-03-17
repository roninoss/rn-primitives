import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import type { RootProps, RootRef, ThumbProps, ThumbRef } from './types';

const Root = (
  {
    ref,
    asChild,
    checked,
    onCheckedChange,
    disabled,
    onPress: onPressProp,
    'aria-valuetext': ariaValueText,
    ...props
  }: RootProps & {
    ref: React.RefObject<RootRef>;
  }
) => {
  function onPress(ev: GestureResponderEvent) {
    if (disabled) return;
    onCheckedChange(!checked);
    onPressProp?.(ev);
  }

  const Component = asChild ? Slot : Pressable;
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
};

Root.displayName = 'RootNativeSwitch';

const Thumb = (
  {
    ref,
    asChild,
    ...props
  }: ThumbProps & {
    ref: React.RefObject<ThumbRef>;
  }
) => {
  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='presentation' {...props} />;
};

Thumb.displayName = 'ThumbNativeSwitch';

export { Root, Thumb };
