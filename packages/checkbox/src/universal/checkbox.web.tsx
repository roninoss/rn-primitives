import { Pressable, View } from '@rn-primitives/core';
import { Indicator as IndicatorWeb, Root as RootWeb } from '../web';
import type { IndicatorProps, RootProps } from './types';

function Root({ native: _native, web, style, ...props }: RootProps) {
  if (style) {
    return (
      <Pressable style={style} asChild>
        <RootWeb {...props} {...(web as any)} />
      </Pressable>
    );
  }
  return <RootWeb {...props} {...(web as any)} />;
}

function Indicator({ web, native: _native, style, ...props }: IndicatorProps) {
  if (style) {
    return (
      <View style={style} asChild>
        <IndicatorWeb {...props} {...web} />
      </View>
    );
  }

  return <IndicatorWeb {...props} {...web} />;
}

export { Indicator, Root };
