import * as Switch from '@radix-ui/react-switch';
import * as React from 'react';
import { Pressable, StyleSheet, View, type GestureResponderEvent } from 'react-native';
import * as Slot from '@rn-primitives/slot';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rn-primitives/types';
import type { SwitchRootProps } from './types';

const Root = React.forwardRef<PressableRef, SlottablePressableProps & SwitchRootProps>(
  (
    {
      asChild,
      checked,
      onCheckedChange,
      disabled,
      onPress: onPressProp,
      onKeyDown: onKeyDownProp,
      style,
      ...props
    },
    ref
  ) => {
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
          style={StyleSheet.flatten(style)}
          {...props}
        />
      </Switch.Root>
    );
  }
);

Root.displayName = 'RootWebSwitch';

const Thumb = React.forwardRef<ViewRef, SlottableViewProps>(({ asChild, style, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <Switch.Thumb asChild>
      <Component ref={ref} style={StyleSheet.flatten(style)} {...props} />
    </Switch.Thumb>
  );
});

Thumb.displayName = 'ThumbWebSwitch';

export { Root, Thumb };
