import { View } from '@rn-primitives/core';
import { Root as RootWeb, Text as TextWeb } from '../web';
import { RootProps, TextProps } from './types';

function Root({ web, native: _native, style, ...props }: RootProps) {
  if (style) {
    return (
      <View style={style} asChild>
        <RootWeb {...props} {...web} />
      </View>
    );
  }

  return <RootWeb {...props} {...web} />;
}

function Text({ web, native: _native, style, ...props }: TextProps) {
  return <TextWeb {...props} {...web} />;
}

export { Root, Text };
