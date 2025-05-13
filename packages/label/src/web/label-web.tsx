import { Label } from '@radix-ui/react-label';
import { RootProps, TextProps } from './types';

const Root = (props: RootProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/label/web is only supported on web.');
  }
  return null;
};

const Text = ((props: TextProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Text` from @rn-primitives/label/web is only supported on web.');
  }
  return null;
}) as unknown as typeof Label;

export { Root, Text };
