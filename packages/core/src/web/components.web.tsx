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

const TextAncestorContext = React.createContext<string | null>(null);

const NON_NESTABLE_TEXT_ELEMENTS = [
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'address',
  'pre',
  'blockquote',
];

function createTextElement() {
  function DivImpl<T extends ElementTag = 'div'>({ asChild, as, ...props }: DivProps<T>) {
    const textAncestor = React.useContext(TextAncestorContext);

    if (asChild) {
      return <Slot {...props} />;
    }

    const adjustedAs =
      textAncestor &&
      NON_NESTABLE_TEXT_ELEMENTS.includes(textAncestor) &&
      NON_NESTABLE_TEXT_ELEMENTS.includes(as ?? '')
        ? 'span'
        : (as ?? (textAncestor ? 'span' : 'div'));

    const element = React.createElement(adjustedAs, {
      'data-rn-primitives': 'text',
      ...props,
    });

    if (textAncestor) {
      return element;
    }

    return (
      <TextAncestorContext.Provider value={adjustedAs}>{element}</TextAncestorContext.Provider>
    );
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
