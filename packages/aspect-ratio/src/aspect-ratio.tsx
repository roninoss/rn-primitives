import * as Slot from '@rn-primitives/slot';
import type { SlottableViewProps, ViewRef } from '@rn-primitives/types';
import * as React from 'react';
import { View, type ViewStyle } from 'react-native';

type RootProps = Omit<SlottableViewProps, 'style'> & {
  ratio?: number;
  style?: ViewStyle;
};

type RootRef = ViewRef;

function Root({ ref, asChild, ratio = 1, style, ...props  }: RootProps & { ref?: React.Ref<RootRef> }) {
    const Component = asChild ? Slot.View : View;
    return <Component ref={ref} style={[style, { aspectRatio: ratio }]} {...props} />;
  }

Root.displayName = 'RootAspectRatio';

export { Root };
export type { RootProps, RootRef };
