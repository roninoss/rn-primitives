import * as React from 'react';
import {
  Image as ImageNative,
  Pressable as PressableNative,
  Text as TextNative,
  type PressableRef as TriggerNativeRef,
  View as ViewNative,
} from '../native';
import type {
  ElementTag,
  ImageProps,
  PressableProps,
  PressableRef,
  TextProps,
  ViewProps,
} from './types';

function Image({ src, web: _web, native, ...props }: ImageProps) {
  return <ImageNative source={{ uri: src }} {...props} {...native} />;
}

function PressableImpl<T extends ElementTag>(
  { web: _web, native, ...props }: PressableProps<T>,
  ref?: React.Ref<PressableRef>
) {
  return (
    <PressableNative ref={ref as React.ForwardedRef<TriggerNativeRef>} {...props} {...native} />
  );
}
const Pressable = React.forwardRef(PressableImpl) as <T extends ElementTag>(
  props: PressableProps<T> & { ref?: React.Ref<PressableRef> }
) => JSX.Element;

function Text<T extends ElementTag>({ web: _web, native, ...props }: TextProps<T>) {
  return <TextNative {...props} {...native} />;
}

function View<T extends ElementTag>({ web: _web, native, ...props }: ViewProps<T>) {
  return <ViewNative {...props} {...native} />;
}

export { Image, Pressable, Text, View };
