import { Root as RootNative, RootProps as RootPropsNative, Text as TextNative } from '../native';
import type { RootProps, TextProps } from './types';

function Root({ web: _web, native, ref, ...props }: RootProps) {
  return (
    <RootNative ref={ref as RootPropsNative['ref']} {...props} {...native} isAnimated={false} />
  );
}

function Text({ web: _web, native, ...props }: TextProps) {
  return <TextNative {...props} {...native} />;
}

export { Root, Text };
