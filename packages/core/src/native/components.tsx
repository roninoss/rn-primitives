'use client';

import type {
  AnimatableImageProps,
  AnimatablePressableProps,
  AnimatableTextProps,
  AnimatableViewProps,
} from './animatable/types';
function Image(_props: AnimatableImageProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Image` from @rn-primitives/core/native is only supported on native.');
  }
  return null;
}

function Pressable(_props: AnimatablePressableProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Pressable` from @rn-primitives/core/native is only supported on native.');
  }
  return null;
}

function Text(_props: AnimatableTextProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Text` from @rn-primitives/core/native is only supported on native.');
  }
  return null;
}

function View(_props: AnimatableViewProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`View` from @rn-primitives/core/native is only supported on native.');
  }
  return null;
}

export { Image, Pressable, Text, View };
