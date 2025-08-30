import * as Slot from '@rn-primitives/slot';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rn-primitives/types';
import * as React from 'react';
import { Pressable, View } from 'react-native';

type RootProps = SlottableViewProps;
type RootRef = ViewRef;

function Root({ ref, asChild, ...props }: RootProps & { ref?: React.Ref<RootRef> }) {
  const Component = asChild ? Slot.View : View;
  return <Component role='table' ref={ref} {...props} />;
}

Root.displayName = 'RootTable';

type HeaderProps = SlottableViewProps;
type HeaderRef = ViewRef;

function Header({ ref, asChild, ...props }: HeaderProps & { ref?: React.Ref<HeaderRef> }) {
  const Component = asChild ? Slot.View : View;
  return <Component role='rowheader' ref={ref} {...props} />;
}

Header.displayName = 'HeaderTable';

type RowProps = SlottablePressableProps;
type RowRef = PressableRef;

function Row({ ref, asChild, ...props }: RowProps & { ref?: React.Ref<RowRef> }) {
  const Component = asChild ? Slot.Pressable : Pressable;
  return <Component ref={ref} role='row' {...props} />;
}

Row.displayName = 'RowTable';

type HeadProps = SlottableViewProps;
type HeadRef = ViewRef;

function Head({ ref, asChild, ...props }: HeadProps & { ref?: React.Ref<HeadRef> }) {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='columnheader' {...props} />;
}

Head.displayName = 'HeadTable';

type BodyProps = SlottableViewProps;
type BodyRef = ViewRef;

function Body({ ref, asChild, ...props }: BodyProps & { ref?: React.Ref<BodyRef> }) {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='rowgroup' {...props} />;
}

Body.displayName = 'BodyTable';

type CellProps = SlottableViewProps;
type CellRef = ViewRef;

function Cell({ ref, asChild, ...props }: CellProps & { ref?: React.Ref<CellRef> }) {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='cell' {...props} />;
}

Cell.displayName = 'CellTable';

type FooterProps = SlottableViewProps;
type FooterRef = ViewRef;

function Footer({ ref, asChild, ...props }: FooterProps & { ref?: React.Ref<FooterRef> }) {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='rowgroup' {...props} />;
}

Footer.displayName = 'FooterTable';

export { Body, Cell, Footer, Head, Header, Root, Row };
export type {
  BodyProps,
  BodyRef,
  CellProps,
  CellRef,
  FooterProps,
  FooterRef,
  HeaderProps,
  HeaderRef,
  HeadProps,
  HeadRef,
  RootProps,
  RootRef,
  RowProps,
  RowRef,
};
