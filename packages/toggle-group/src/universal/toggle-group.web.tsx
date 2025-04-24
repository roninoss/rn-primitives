import { Pressable, View } from '@rn-primitives/core';
import { Root as RootWeb, Item as ItemWeb, useRootContext, useItemContext } from '../web';
import type { RootProps, ItemProps } from './types';

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

function Item({ native: _native, web, ...props }: ItemProps) {
  return (
    <ItemWeb asChild>
      <Pressable web={{ as: 'button', ...web }} {...props} />
    </ItemWeb>
  );
}

export { Item, Root, useRootContext, useItemContext };
