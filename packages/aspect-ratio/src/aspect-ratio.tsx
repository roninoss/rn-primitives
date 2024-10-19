import * as React from 'react';
import { View, type ViewStyle } from 'react-native';
import * as Slot from '@rn-primitives/slot';
import type { SlottableViewProps } from '@rn-primitives/types';

type AspectRatioRootProps = {
  ratio?: number;
  style?: ViewStyle;
};

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  Omit<SlottableViewProps, 'style'> & AspectRatioRootProps
>(({ asChild, ratio = 1, style, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} style={[style, { aspectRatio: ratio }]} {...props} />;
});

Root.displayName = 'RootAspectRatio';

export { Root };
export type { AspectRatioRootProps };
