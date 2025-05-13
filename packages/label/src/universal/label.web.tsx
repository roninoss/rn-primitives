import { Root as RootWeb, Text as TextWeb } from '../web';
import { RootProps, TextProps } from './types';

function Root({ ref, web, native: _native, style, ...props }: RootProps) {
  return <RootWeb {...props} {...web} />;
}

function Text({ web, native: _native, style, ...props }: TextProps) {
  return <TextWeb {...props} {...web} />;
}

export { Root, Text };
