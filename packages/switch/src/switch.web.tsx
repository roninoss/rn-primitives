import * as Switch from '@radix-ui/react-switch';
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
  onKeyDown: onKeyDownProp,
  ref,
  ...props
}: RootProps) {
  function onPress(ev: GestureResponderEvent) {
    onCheckedChange(!checked);
    onPressProp?.(ev);
  }

  function onKeyDown(ev: React.KeyboardEvent) {
    onKeyDownProp?.(ev);
    if (ev.key === ' ') {
      onCheckedChange(!checked);
    }
  }

  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <Switch.Root checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} asChild>
      <Component
        ref={ref}
        disabled={disabled}
        onPress={onPress}
        // @ts-expect-error Web only
        onKeyDown={onKeyDown}
        {...props}
      />
    </Switch.Root>
  );
}

Root.displayName = 'RootWebSwitch';

function Thumb({ asChild, ref, ...props }: ThumbProps) {
  const Component = asChild ? Slot.View : View;
  return (
    <Switch.Thumb asChild>
      <Component ref={ref} {...props} />
    </Switch.Thumb>
  );
}

Thumb.displayName = 'ThumbWebSwitch';

export { Root, Thumb };
