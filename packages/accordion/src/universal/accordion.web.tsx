import { Pressable, View } from '@rn-primitives/core';
import * as React from 'react';
import {
  Content as ContentWeb,
  Header as HeaderWeb,
  Item as ItemWeb,
  Root as RootWeb,
  Trigger as TriggerWeb,
  useItemContext,
  useRootContext,
} from '../web';
import type { ContentProps, HeaderProps, ItemProps, RootProps, TriggerProps } from './types';

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

function Content({ native: _native, style, web, ...props }: ContentProps) {
  if (style) {
    return (
      <View style={style} asChild>
        <ContentWeb {...props} {...web} />
      </View>
    );
  }
  return <ContentWeb {...props} {...web} />;
}

function Header({ native: _native, style, web, ...props }: HeaderProps) {
  if (style) {
    return (
      <View style={style} asChild>
        <HeaderWeb {...props} {...web} />
      </View>
    );
  }
  return <HeaderWeb {...props} {...web} />;
}

function Item({ native: _native, style, web, ...props }: ItemProps) {
  if (style) {
    return (
      <View style={style} asChild>
        <ItemWeb {...props} {...web} />
      </View>
    );
  }
  return <ItemWeb {...props} {...web} />;
}

function Trigger({ native: _native, web, ...props }: TriggerProps) {
  return (
    <TriggerWeb asChild>
      <Pressable web={{ as: 'button', ...web }} {...props} />
    </TriggerWeb>
  );
}

export { Content, Header, Item, Root, Trigger, useItemContext, useRootContext };
