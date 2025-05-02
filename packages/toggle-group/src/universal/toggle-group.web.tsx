import { Pressable, View } from '@rn-primitives/core';
import { mergeProps } from '@rn-primitives/utils';
import { Item as ItemWeb, Root as RootWeb, useItemContext, useRootContext } from '../web';
import type { ItemProps, RootProps } from './types';

const DEFAULT_PRESSABLE_WEB = { as: 'button' } as const;

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

function Item({ native: _native, web, value, ...props }: ItemProps) {
  return (
    <ItemWeb asChild value={value}>
      <Pressable web={mergeProps(DEFAULT_PRESSABLE_WEB, web)} {...props} />
    </ItemWeb>
  );
}

export { Item, Root, useItemContext, useRootContext };
