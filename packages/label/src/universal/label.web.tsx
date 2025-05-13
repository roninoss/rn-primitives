import { Root as RootWeb, Text as TextWeb } from '../web';
import { RootProps, TextProps } from './types';
import { View } from '@rn-primitives/core';

function Root({ ref, web, native: _native, ...props }: RootProps) {
  return <RootWeb {...props} {...web} />;
}

function Text({ web, native: _native, style, ...props }: TextProps) {
  if (style) {
    return (
      <View style={style} asChild>
        <TextWeb {...props} {...web} />
      </View>
    );
  }
  return <TextWeb {...props} {...web} />;
}

export { Root, Text };
