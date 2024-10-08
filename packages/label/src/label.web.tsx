import * as Label from '@radix-ui/react-label';
import * as Slot from '@rn-primitives/slot';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  TextRef,
} from '@rn-primitives/types';
import * as React from 'react';
import { Text as RNText, Pressable } from 'react-native';
import type { LabelRootProps, LabelTextProps } from './types';

const Root = React.forwardRef<
  PressableRef,
  Omit<SlottablePressableProps, 'children' | 'hitSlop' | 'style'> & LabelRootProps
>(({ asChild, tabIndex = -1, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return <Component ref={ref} tabIndex={tabIndex} {...props} />;
});

Root.displayName = 'RootWebLabel';

const Text = React.forwardRef<TextRef, SlottableTextProps & LabelTextProps>(
  ({ asChild, nativeID, htmlFor, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Label.Root asChild={!htmlFor} id={nativeID} htmlFor={htmlFor}>
        <Component ref={ref} {...props} />
      </Label.Root>
    );
  }
);

Text.displayName = 'TextWebLabel';

export { Root, Text };
