import type { Slottable } from '@rn-primitives/types';

type ElementTag = keyof HTMLElementTagNameMap;

type Element<T extends ElementTag> = T extends ElementTag ? HTMLElementTagNameMap[T] : 'div';

type DivProps<T extends ElementTag> = React.ComponentProps<T extends ElementTag ? T : 'div'> & {
  asChild?: boolean | undefined;
  as?: T;
};

type PressableProps<T extends ElementTag> = DivProps<T>;
type TextProps<T extends ElementTag> = DivProps<T>;
type ViewProps<T extends ElementTag> = DivProps<T>;
type ImageProps = Slottable<React.ComponentProps<'img'>>;

export type { DivProps, ElementTag, Element, ImageProps, PressableProps, TextProps, ViewProps };
