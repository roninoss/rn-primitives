'use client';

import { Slot } from '@rn-primitives/slot';
import type { Slottable } from '@rn-primitives/types';
import * as React from 'react';
import {
  ARIA_LEVEL_TO_ELEMENT_TAG_NAME_MAP,
  ROLE_TO_ELEMENT_TAG_NAME_MAP,
  ROLE_TO_INPUT_TYPE_MAP,
} from './constants';
import type { AriaLevel, DivProps, ElementFromRole, Role, RoleForInputType } from './types';

function DivImpl<T extends Role | undefined = undefined>(
  { asChild, role, 'aria-level': ariaLevel, ...props }: DivProps<T>,
  ref: React.Ref<ElementFromRole<T>>
) {
  if (asChild) {
    return <Slot ref={ref} {...props} />;
  }

  const element = getElement(role, ariaLevel);
  return React.createElement(element, {
    ref,
    'data-rn-primitives': true,
    ...(element === 'input' ? { type: ROLE_TO_INPUT_TYPE_MAP[role as RoleForInputType] } : {}),
    role: role && role in ROLE_TO_ELEMENT_TAG_NAME_MAP ? undefined : role,
    ...props,
  });
}

function getElement<T extends Role | undefined = undefined>(
  role: (React.AriaRole & T) | undefined,
  ariaLevel?: number
) {
  const element =
    role && ROLE_TO_ELEMENT_TAG_NAME_MAP[role] ? ROLE_TO_ELEMENT_TAG_NAME_MAP[role] : 'div';

  if (element === 'h1') {
    return (ARIA_LEVEL_TO_ELEMENT_TAG_NAME_MAP[ariaLevel as AriaLevel] ??
      'h1') as keyof HTMLElementTagNameMap;
  }

  return element as keyof HTMLElementTagNameMap;
}

const Div = React.forwardRef(DivImpl) as <T extends Role | undefined = undefined>(
  props: DivProps<T> & { ref?: React.Ref<ElementFromRole<T>> }
) => JSX.Element;

const Pressable = Div;

const Text = Div;

const View = Div;

const Image = React.forwardRef<HTMLImageElement, Slottable<React.ComponentPropsWithoutRef<'img'>>>(
  ({ asChild, ...props }, ref) => {
    if (asChild) {
      return <Slot ref={ref} {...props} />;
    }
    return <img data-rn-primitives='true' ref={ref} {...props} />;
  }
);

Image.displayName = 'ImageWeb';

export { Image, Pressable, Text, View };
