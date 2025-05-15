import { Pressable, Text as RNPText } from '@rn-primitives/core/dist/native';
import type { RootProps, TextProps } from './types';

function Root({ for: forProp, ...props }: RootProps) {
  return <Pressable aria-labelledby={forProp} {...props} />;
}

function Text({ ...props }: TextProps) {
  return <RNPText {...props} />;
}

export { Root, Text };
