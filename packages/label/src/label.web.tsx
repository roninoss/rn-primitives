import * as Label from '@radix-ui/react-label';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, Text as RNText } from 'react-native';
import type { RootProps, RootRef, TextProps, TextRef } from './types';
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({ asChild, tabIndex = -1, ref, ...props }: RootComponentProps) => {
  const Component = asChild ? Slot : Pressable;
  return <Component ref={ref} tabIndex={tabIndex} {...props} />;
};

Root.displayName = 'RootWebLabel';
type TextComponentProps = TextProps & React.RefAttributes<TextRef>;

const Text = ({ asChild, nativeID, htmlFor, ref, ...props }: TextComponentProps) => {
  const Component = asChild ? Slot : RNText;
  return (
    <Label.Root asChild={!htmlFor} id={nativeID} htmlFor={htmlFor}>
      <Component ref={ref} {...props} />
    </Label.Root>
  );
};

Text.displayName = 'TextWebLabel';

export { Root, Text };
