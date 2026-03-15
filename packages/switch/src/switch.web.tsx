import * as Switch from '@radix-ui/react-switch';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import type { RootProps, RootRef, ThumbProps, ThumbRef } from './types';
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  checked,
  onCheckedChange,
  disabled,
  onPress: onPressProp,
  onKeyDown: onKeyDownProp,
  ref,
  ...props
}: RootComponentProps) => {
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

  const Component = asChild ? Slot : Pressable;
  return (
    <Switch.Root checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} asChild>
      <Component
        ref={ref}
        disabled={disabled}
        onPress={onPress}
        onKeyDown={onKeyDown}
        {...props}
      />
    </Switch.Root>
  );
};

Root.displayName = 'RootWebSwitch';
type ThumbComponentProps = ThumbProps & React.RefAttributes<ThumbRef>;

const Thumb = ({ asChild, ref, ...props }: ThumbComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <Switch.Thumb asChild>
      <Component ref={ref} {...props} />
    </Switch.Thumb>
  );
};

Thumb.displayName = 'ThumbWebSwitch';

export { Root, Thumb };
