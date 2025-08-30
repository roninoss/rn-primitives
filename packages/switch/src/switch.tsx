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
      'aria-valuetext': ariaValueText,
      ...restProps
    } = props;
    
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
        {...restProps}
      />
    );
  }
);

Root.displayName = 'RootNativeSwitch';

// React 19 compatible component that works with existing forwardRef infrastructure
function Thumb(props: ThumbProps) {
  const { ref, ...otherProps } = props;
  return <ThumbImpl ref={ref as unknown as ThumbRef} {...otherProps} />;
}

const ThumbImpl = React.forwardRef<ThumbRef, Omit<ThumbProps, 'ref'>>(
  (props, ref) => {
    const { asChild, ...restProps } = props;
    const Component = asChild ? Slot.View : View;
    return <Component ref={ref} role='presentation' {...restProps} />;
  }
);

Thumb.displayName = 'ThumbNativeSwitch';

export { Root, Thumb };
