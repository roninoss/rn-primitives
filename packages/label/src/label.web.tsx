import * as Label from '@radix-ui/react-label';
import * as Slot from '@rn-primitives/slot';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  TextRef,
} from '@rn-primitives/types';
import * as React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import type { LabelRootProps, LabelTextProps } from './types';

const Root = React.forwardRef<
  PressableRef,
  Omit<SlottablePressableProps, 'children' | 'hitSlop' | 'style'> & LabelRootProps
>(({ asChild, style, ...props }, ref) => {
  const Component = asChild ? Slot.View : Slot.View;
  return <Component ref={ref} style={StyleSheet.flatten(style)} {...props} />;
});

Root.displayName = 'RootWebLabel';

const Text = React.forwardRef<TextRef, SlottableTextProps & LabelTextProps>(
  ({ asChild, nativeID, style, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Label.Root asChild id={nativeID}>
        <Component ref={ref} style={StyleSheet.flatten(style)} {...props} />
      </Label.Root>
    );
  }
);

Text.displayName = 'TextWebLabel';

export { Root, Text };
