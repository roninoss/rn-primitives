import { View } from '@rn-primitives/core';
import { Indicator as IndicatorWeb, Root as RootWeb } from '../web';
import type { IndicatorProps, RootProps } from './types';

function Root({ native: _native, web, style, ...props }: RootProps) {
  if (style) {
    return (
      <View style={style} asChild>
        <RootWeb {...props} {...(web as any)} />
      </View>
    );
  }
  return <RootWeb {...props} {...(web as any)} />;
}

function Indicator({ native: _native, web, style, ...props }: IndicatorProps) {
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
