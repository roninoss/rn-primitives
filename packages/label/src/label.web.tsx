import * as Label from '@radix-ui/react-label';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, Text as RNText } from 'react-native';
import type { RootProps, RootRef, TextProps, TextRef } from './types';

const Root = (
  {
    ref,
    asChild,
    tabIndex = -1,
    ...props
  }: RootProps & {
    ref: React.RefObject<RootRef>;
  }
) => {
  const Component = asChild ? Slot : Pressable;
  return <Component ref={ref} tabIndex={tabIndex} {...props} />;
};

Root.displayName = 'RootWebLabel';

const Text = (
  {
    ref,
    asChild,
    nativeID,
    htmlFor,
    ...props
  }: TextProps & {
    ref: React.RefObject<TextRef>;
  }
) => {
  const Component = asChild ? Slot : RNText;
  return (
    <Label.Root asChild={!htmlFor} id={nativeID} htmlFor={htmlFor}>
      <Component ref={ref} {...props} />
    </Label.Root>
  );
};

Text.displayName = 'TextWebLabel';

export { Root, Text };
