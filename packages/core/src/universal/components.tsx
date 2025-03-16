import * as React from 'react';
import {
  Image as ImageNative,
  Pressable as PressableNative,
  Text as TextNative,
  type PressableRef as TriggerNativeRef,
  View as ViewNative,
} from '../native';
import type { ElementTag, ImageProps, PressableProps, TextProps, ViewProps } from './types';

function Image({ src, web: _web, native, ...props }: ImageProps) {
  return <ImageNative source={{ uri: src }} {...props} {...native} />;
}

function Pressable<T extends ElementTag>({ web: _web, native, ref, ...props }: PressableProps<T>) {
  return <PressableNative ref={ref as TriggerNativeRef | undefined} {...props} {...native} />;
}

function Text<T extends ElementTag>({ web: _web, native, ...props }: TextProps<T>) {
  return <TextNative {...props} {...native} />;
}

function View<T extends ElementTag>({ web: _web, native, ...props }: ViewProps<T>) {
  return <ViewNative {...props} {...native} />;
}

export { Image, Pressable, Text, View };
