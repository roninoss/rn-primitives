import { Pressable, View } from '@rn-primitives/core';
import { mergeProps } from '@rn-primitives/utils';
import * as React from 'react';
import { Content as ContentWeb, Root as RootWeb, Trigger as TriggerWeb } from '../web';
import type { ContentProps, RootProps, TriggerProps } from './types';

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

const DEFAULT_PRESSABLE_WEB = { as: 'button' } as const;

function Trigger({ native: _native, web, ...props }: TriggerProps) {
  return (
    <TriggerWeb asChild>
      <Pressable web={mergeProps(DEFAULT_PRESSABLE_WEB, web)} {...props} />
    </TriggerWeb>
  );
}

export { Content, Root, Trigger };
