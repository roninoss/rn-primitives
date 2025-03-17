import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, Text as RNText } from 'react-native';
import type { RootProps, RootRef, TextProps, TextRef } from './types';

const Root = (
  {
    ref,
    asChild,
    ...props
  }: RootProps & {
    ref: React.RefObject<RootRef>;
  }
) => {
  const Component = asChild ? Slot : Pressable;
  return <Component ref={ref} {...props} />;
};

Root.displayName = 'RootNativeLabel';

const Text = (
  {
    ref,
    asChild,
    ...props
  }: TextProps & {
    ref: React.RefObject<TextRef>;
  }
) => {
  const Component = asChild ? Slot : RNText;
  return <Component ref={ref} {...props} />;
};

Text.displayName = 'TextNativeLabel';

export { Root, Text };
