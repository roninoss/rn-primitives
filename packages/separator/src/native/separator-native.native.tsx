import { View } from '@rn-primitives/core/dist/native';
import type { RootProps } from './types';

const Root = ({ decorative, orientation = 'horizontal', ...props }: RootProps) => {
  return (
    <View
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={orientation}
      {...props}
    />
  );
};

export { Root };
