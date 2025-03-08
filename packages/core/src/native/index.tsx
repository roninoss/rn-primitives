import type { ImageRef, PressableRef, TextRef, ViewRef } from '@rn-primitives/types';
import * as React from 'react';
import type {
  AnimatableImageProps,
  AnimatablePressableProps,
  AnimatableTextProps,
  AnimatableViewProps,
} from './animatable/types';

const Image = React.forwardRef<ImageRef, AnimatableImageProps>(() => {
  return null;
});

const Pressable = React.forwardRef<PressableRef, AnimatablePressableProps>(() => {
  return null;
});

const Text = React.forwardRef<TextRef, AnimatableTextProps>(() => {
  return null;
});

const View = React.forwardRef<ViewRef, AnimatableViewProps>(() => {
  return null;
});

export { Image, Pressable, Text, View };
