import { Pressable, View } from '@rn-primitives/core';
import { Indicator as IndicatorWeb, Root as RootWeb } from '../web';
import type { IndicatorProps, RootProps } from './types';

function Root({ web, native: _native, style, ...props }: RootProps) {
  return (
    <RootWeb asChild>
      <Pressable web={{ as: 'button', ...web }} {...props} />
    </RootWeb>
  );
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
