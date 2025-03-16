'use client';

import type { Slottable } from '@rn-primitives/types';
import * as React from 'react';
import type { DivProps, ElementTag } from './types';

function Div<T extends ElementTag = 'div'>(_props: DivProps<T>) {
  if (process.env.NODE_ENV === 'development') {
    console.log(
      '`Pressable`, `Text`, and `View` from @rn-primitives/core/web are only supported on web.'
    );
  }
  return null;
}

function Image(_props: Slottable<React.ComponentProps<'img'>>) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Image` from @rn-primitives/core/web is only supported on web.');
  }

  return null;
}

Image.displayName = 'ImgWeb';

const Pressable = Div;

const Text = Div;

const View = Div;

export { Image, Pressable, Text, View };
