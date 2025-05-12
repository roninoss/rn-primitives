import { Pressable, Text as RNPText } from '@rn-primitives/core/dist/native';
import type { RootProps, TextProps } from './types';

function Root({ ...props }: RootProps) {
  return <Pressable {...props} />;
}

function Text({ ...props }: TextProps) {
  return <RNPText {...props} />;
}

export { Root, Text };
