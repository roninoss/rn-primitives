'use client';

import { useAugmentedRef } from '@rn-primitives/hooks';
import { Slot } from '@rn-primitives/slot';
import { EmptyGestureResponderEvent } from '@rn-primitives/utils';
import * as React from 'react';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import type { AnimatablePressableProps } from './types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnimatablePressable = ({ ref, asChild, ...props }: AnimatablePressableProps) => {
  const methods = React.useMemo(() => {
    return {
      press: () => {
        if (typeof props.onPress === 'function') {
          props.onPress(EmptyGestureResponderEvent);
        }
      },
    };
  }, [props.onPress]);

  const triggerRef = useAugmentedRef({ ref, methods });

  if (asChild) {
    return <Slot ref={triggerRef} {...props} />;
  }
  if (props.isAnimated) {
    return <AnimatedPressable ref={triggerRef} {...props} />;
  }
  return <Pressable ref={triggerRef} {...props} />;
};

export { AnimatablePressable };
