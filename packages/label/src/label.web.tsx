import * as Label from '@radix-ui/react-label';
import * as Slot from '@rn-primitives/slot';
import type { PressableRef, TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Pressable, Text as RNText } from 'react-native';
import type { LabelRootProps, LabelTextProps } from './types';

const Root = React.forwardRef<PressableRef, LabelRootProps>(
  ({ asChild, tabIndex = -1, ...props }, ref) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return <Component ref={ref} tabIndex={tabIndex} {...props} />;
  }
);

Root.displayName = 'RootWebLabel';

const Text = React.forwardRef<TextRef, LabelTextProps>(
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
