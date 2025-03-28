import { View } from '@rn-primitives/core/dist/native';
import * as React from 'react';
import type { RootProps } from './types';

function Root({ style, ratio, ...props }: RootProps) {
  return <View style={getStyle(style, ratio) as any} {...props} />;
}

function getStyle(style: RootProps['style'], aspectRatio: RootProps['ratio']) {
  if (aspectRatio == null && !style) {
    return undefined;
  }
  if (!style) {
    return { aspectRatio };
  }
  if (aspectRatio == null) {
    return style;
  }
  if (Array.isArray(style)) {
    return [...style, { aspectRatio }];
  }
  if (typeof style === 'object') {
    return { ...style, aspectRatio };
  }
  // If made it here, style overrides aspectRatio
  return style;
}

export { Root };
