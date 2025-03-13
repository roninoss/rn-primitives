'use client';

import type { Slottable } from '@rn-primitives/types';
import * as React from 'react';
import type { DivProps, Element, ElementTag } from './types';

function DivImpl<T extends ElementTag = 'div'>(_props: DivProps<T>, _ref: React.Ref<Element<T>>) {
  if (process.env.NODE_ENV === 'development') {
    console.log(
      '`Pressable`, `Text`, and `View` from @rn-primitives/core/web are only supported on web.'
    );
  }
  return null;
}

const Div = React.forwardRef(DivImpl) as <T extends ElementTag = 'div'>(
  props: DivProps<T> & { ref?: React.Ref<Element<T>> }
) => JSX.Element;

const Image = React.forwardRef<HTMLImageElement, Slottable<React.ComponentPropsWithoutRef<'img'>>>(
  () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('`Image` from @rn-primitives/core/web is only supported on web.');
    }

    return null;
  }
);

Image.displayName = 'ImgWeb';

const Pressable = Div;

const Text = Div;

const View = Div;

export { Image, Pressable, Text, View };
