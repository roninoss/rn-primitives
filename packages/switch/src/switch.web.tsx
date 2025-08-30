import * as Switch from '@radix-ui/react-switch';
import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import type { RootProps, RootRef, ThumbProps, ThumbRef } from './types';

// React 19 compatible component that works with existing forwardRef infrastructure
function Root(props: RootProps) {
  const { ref, ...otherProps } = props;
  return <RootImpl ref={ref as unknown as RootRef} {...otherProps} />;
}

const RootImpl = React.forwardRef<RootRef, Omit<RootProps, 'ref'>>(
  (props, ref) => {
    const {
      asChild,
      checked,
      onCheckedChange,
      disabled,
      onPress: onPressProp,
      onKeyDown: onKeyDownProp,
      ...restProps
    } = props;
    
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
          {...restProps}
        />
      </Switch.Root>
    );
  }
);

Root.displayName = 'RootWebSwitch';

// React 19 compatible component that works with existing forwardRef infrastructure  
function Thumb(props: ThumbProps) {
  const { ref, ...otherProps } = props;
  return <ThumbImpl ref={ref as unknown as ThumbRef} {...otherProps} />;
}

const ThumbImpl = React.forwardRef<ThumbRef, Omit<ThumbProps, 'ref'>>(
  (props, ref) => {
    const { asChild, ...restProps } = props;
    const Component = asChild ? Slot.View : View;
    return (
      <Switch.Thumb asChild>
        <Component ref={ref} {...restProps} />
      </Switch.Thumb>
    );
  }
);

Thumb.displayName = 'ThumbWebSwitch';

export { Root, Thumb };
