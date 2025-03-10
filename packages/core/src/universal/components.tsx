import * as React from 'react';
import {
  Image as ImageNative,
  Pressable as PressableNative,
  Text as TextNative,
  type PressableRef as TriggerNativeRef,
  View as ViewNative,
} from '../native';
import type { Role } from '../web';
import type { ImageProps, PressableProps, PressableRef, TextProps, ViewProps } from './types';

function Image({ src, role, web: _web, native, ...props }: ImageProps) {
  return (
    <ImageNative
      source={{ uri: src }}
      role={role === 'paragraph' ? undefined : role}
      {...props}
      {...native}
    />
  );
}

function PressableImpl<T extends Role | undefined>(
  { role, web: _web, native, ...props }: PressableProps<T>,
  ref?: React.Ref<PressableRef>
) {
  return (
    <PressableNative
      ref={ref as React.ForwardedRef<TriggerNativeRef>}
      role={role === 'paragraph' ? undefined : role}
      {...props}
      {...native}
    />
  );
}
const Pressable = React.forwardRef(PressableImpl) as <T extends Role | undefined>(
  props: PressableProps<T> & { ref?: React.Ref<PressableRef> }
) => JSX.Element;

function Text<T extends Role | undefined>({ role, web: _web, native, ...props }: TextProps<T>) {
  return <TextNative {...props} role={role === 'paragraph' ? undefined : role} {...native} />;
}

function View<T extends Role | undefined>({ role, web: _web, native, ...props }: ViewProps<T>) {
  return <ViewNative {...props} role={role === 'paragraph' ? undefined : role} {...native} />;
}

export { Image, Pressable, Text, View };
