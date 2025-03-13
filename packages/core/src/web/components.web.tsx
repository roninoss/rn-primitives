'use client';

import { Slot } from '@rn-primitives/slot';
import type { Slottable } from '@rn-primitives/types';
import * as React from 'react';
import type { DivProps, Element, ElementTag } from './types';

function createDivElement(type: 'pressable' | 'view') {
  function DivImpl<T extends ElementTag = 'div'>(
    { asChild, as, ...props }: DivProps<T>,
    ref?: React.Ref<Element<T>>
  ) {
    if (asChild) {
      return <Slot ref={ref} {...props} />;
    }

    return React.createElement(as ?? 'div', {
      ref,
      'data-rn-primitives': type,
      ...props,
    });
  }

  return React.forwardRef(DivImpl) as <T extends ElementTag = 'div'>(
    props: DivProps<T> & { ref?: React.Ref<Element<T>> }
  ) => JSX.Element;
}

const HasAncestorContext = React.createContext(false);

function createTextElement() {
  function DivImpl<T extends ElementTag = 'div'>(
    { asChild, as, ...props }: DivProps<T>,
    ref?: React.Ref<Element<T>>
  ) {
    const hasAncestor = React.useContext(HasAncestorContext);

    if (asChild) {
      return <Slot ref={ref} {...props} />;
    }

    const element = React.createElement(!as ? (hasAncestor ? 'span' : 'div') : as, {
      ref,
      'data-rn-primitives': 'text',
      ...props,
    });

    if (hasAncestor) {
      return element;
    }

    return <HasAncestorContext.Provider value={true}>{element}</HasAncestorContext.Provider>;
  }

  return React.forwardRef(DivImpl) as <T extends ElementTag = 'div'>(
    props: DivProps<T> & { ref?: React.Ref<Element<T>> }
  ) => JSX.Element;
}

const Pressable = createDivElement('pressable');

const View = createDivElement('view');

const Text = createTextElement();

const Image = React.forwardRef<HTMLImageElement, Slottable<React.ComponentPropsWithoutRef<'img'>>>(
  ({ asChild, ...props }, ref) => {
    if (asChild) {
      return <Slot ref={ref} {...props} />;
    }
    return <img data-rn-primitives='image' ref={ref} {...props} />;
  }
);

Image.displayName = 'ImageWeb';

export { Image, Pressable, Text, View };
