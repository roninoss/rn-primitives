'use client';

import type { ImageRef, PressableRef, TextRef, ViewRef } from '@rn-primitives/types';
import * as React from 'react';
import type {
  AnimatableImageProps,
  AnimatablePressableProps,
  AnimatableTextProps,
  AnimatableViewProps,
} from './animatable/types';

const Image = React.forwardRef<ImageRef, AnimatableImageProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Image` from @rn-primitives/core/native is only supported on native.');
  }
  return null;
});

const Pressable = React.forwardRef<PressableRef, AnimatablePressableProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Pressable` from @rn-primitives/core/native is only supported on native.');
  }
  return null;
});

const Text = React.forwardRef<TextRef, AnimatableTextProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Text` from @rn-primitives/core/native is only supported on native.');
  }
  return null;
});

const View = React.forwardRef<ViewRef, AnimatableViewProps>(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`View` from @rn-primitives/core/native is only supported on native.');
  }
  return null;
});

export { Image, Pressable, Text, View };
