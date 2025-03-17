'use client';

import type {
  AnimatableImage,
  AnimatablePressable,
  AnimatableText,
  AnimatableView,
} from './animatable';

const Image = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Image` from @rn-primitives/core/native is only supported on native.');
  }
  return null;
}) as unknown as typeof AnimatableImage;

const Pressable = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Pressable` from @rn-primitives/core/native is only supported on native.');
  }
  return null;
}) as unknown as typeof AnimatablePressable;

const Text = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Text` from @rn-primitives/core/native is only supported on native.');
  }
  return null;
}) as unknown as typeof AnimatableText;

const View = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`View` from @rn-primitives/core/native is only supported on native.');
  }
  return null;
}) as unknown as typeof AnimatableView;

export { Image, Pressable, Text, View };
