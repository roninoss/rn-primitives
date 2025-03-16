'use client';

import { Slot } from '@rn-primitives/slot';
import type { Slottable } from '@rn-primitives/types';
import * as React from 'react';
import type { DivProps, ElementTag } from './types';

function createDivElement(type: 'pressable' | 'view') {
  function DivImpl<T extends ElementTag = 'div'>({ asChild, as, ...props }: DivProps<T>) {
    if (asChild) {
      return <Slot {...props} />;
    }

    return React.createElement(as ?? 'div', {
      'data-rn-primitives': type,
      ...props,
    });
  }

  return DivImpl;
}

const HasAncestorContext = React.createContext(false);

function createTextElement() {
  function DivImpl<T extends ElementTag = 'div'>({ asChild, as, ...props }: DivProps<T>) {
    const hasAncestor = React.useContext(HasAncestorContext);

    if (asChild) {
      return <Slot {...props} />;
    }

    const element = React.createElement(!as ? (hasAncestor ? 'span' : 'div') : as, {
      'data-rn-primitives': 'text',
      ...props,
    });

    if (hasAncestor) {
      return element;
    }

    return <HasAncestorContext.Provider value={true}>{element}</HasAncestorContext.Provider>;
  }

  return DivImpl;
}

const Pressable = createDivElement('pressable');

const View = createDivElement('view');

const Text = createTextElement();

function Image({ asChild, ...props }: Slottable<React.ComponentProps<'img'>>) {
  if (asChild) {
    return <Slot {...props} />;
  }
  return <img data-rn-primitives='image' {...props} />;
}

Image.displayName = 'ImageWeb';

export { Image, Pressable, Text, View };
