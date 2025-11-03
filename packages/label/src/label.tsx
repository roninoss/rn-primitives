import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, Text as RNText } from 'react-native';
import type { RootProps, RootRef, TextProps, TextRef } from './types';

function Root({ ref, asChild, ...props }: RootProps & { ref?: React.Ref<RootRef> }) {
  const Component = asChild ? Slot.Pressable : Pressable;
  return <Component ref={ref} {...props} />;
}

Root.displayName = 'RootNativeLabel';

function Text({ ref, asChild, ...props }: TextProps & { ref?: React.Ref<TextRef> }) {
  const Component = asChild ? Slot.Text : RNText;
  return <Component ref={ref} {...props} />;
}

Text.displayName = 'TextNativeLabel';

export { Root, Text };
