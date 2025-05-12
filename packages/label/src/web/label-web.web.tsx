import { Label } from '@radix-ui/react-label';
import { withRNPrimitives } from '@rn-primitives/utils';
import type { RootProps } from './types';

const Root = ({ children, tabIndex = -1, ...props }: RootProps) => {
  return (
    <div tabIndex={tabIndex} {...props}>
      {children}
    </div>
  );
};

const Text = withRNPrimitives(Label, 'text');

export { Root, Text };
