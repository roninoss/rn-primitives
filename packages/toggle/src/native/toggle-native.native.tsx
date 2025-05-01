import { Pressable } from '@rn-primitives/core/dist/native';
import { useControllableState } from '@rn-primitives/hooks';
import * as React from 'react';
import type { GestureResponderEvent } from 'react-native';
import type { RootProps } from './types';

const Root = ({
  asChild,
  pressed: pressedProp,
  onPressedChange: onPressedChangeProp,
  disabled,
  onPress: onPressProp,
  defaultPressed,
  ...props
}: RootProps) => {
  const [pressed = false, onPressedChange] = useControllableState({
    prop: pressedProp,
    defaultProp: defaultPressed,
    onChange: onPressedChangeProp,
  });

  const onPress = React.useCallback(
    (ev: GestureResponderEvent) => {
      onPressedChange((prev) => !prev);

      if (typeof onPressProp === 'function') {
        onPressProp(ev);
      }
    },
    [onPressedChange, onPressProp]
  );

  return (
    <Pressable
      aria-disabled={disabled}
      accessibilityRole='togglebutton'
      aria-checked={pressed}
      onPress={onPress}
      disabled={disabled}
      {...props}
    />
  );
};

export { Root };
