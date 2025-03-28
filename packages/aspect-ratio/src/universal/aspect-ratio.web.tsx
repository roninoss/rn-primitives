import { View } from '@rn-primitives/core';
import { Root as RootWeb } from '../web';
import type { RootProps } from './types';

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

export { Root };
