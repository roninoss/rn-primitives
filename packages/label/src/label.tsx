import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, Text as RNText } from 'react-native';
import type { RootProps, RootRef, TextProps, TextRef } from './types';

const Root = React.forwardRef<RootRef, RootProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot : Pressable;
  return <Component ref={ref} {...props} />;
});

Root.displayName = 'RootNativeLabel';

const Text = React.forwardRef<TextRef, TextProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot : RNText;
  return <Component ref={ref} {...props} />;
});

Text.displayName = 'TextNativeLabel';

export { Root, Text };
