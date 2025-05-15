import { Pressable, View } from '@rn-primitives/core';
import { mergeProps } from '@rn-primitives/utils';
import { Root as RootWeb, Text as TextWeb } from '../web';
import type { RootProps, TextProps } from './types';

const DEFAULT_PRESSABLE_WEB = { as: 'div' } as const;

function Root({ for: forProp, native: _native, web, ...props }: RootProps) {
  return (
    <RootWeb for={forProp} asChild>
      <Pressable web={mergeProps(DEFAULT_PRESSABLE_WEB, web)} {...props} />
    </RootWeb>
  );
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
