import type { Slottable } from '@rn-primitives/types';
import * as React from 'react';
import type { BoxProps, ElementFromRole, Role } from './types';

function BoxImpl<T extends Role | undefined = undefined>(
  _props: BoxProps<T>,
  _ref: React.Ref<ElementFromRole<T>>
) {
  return null;
}

const Box = React.forwardRef(BoxImpl) as <T extends Role | undefined = undefined>(
  props: BoxProps<T> & { ref?: React.Ref<ElementFromRole<T>> }
) => JSX.Element;

const Image = React.forwardRef<HTMLImageElement, Slottable<React.ComponentPropsWithoutRef<'img'>>>(
  () => {
    return null;
  }
);

Image.displayName = 'ImgWeb';

const Pressable = Box;

const Text = Box;

const View = Box;

export { Image, Pressable, Text, View };
