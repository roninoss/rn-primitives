import { Slot } from '@rn-primitives/slot';
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

const Root = (
  {
    ref,
    asChild,
    ...props
  }: RootProps & {
    ref: React.RefObject<RootRef>;
  }
) => {
  const Component = asChild ? Slot : View;
  return <Component role='table' ref={ref} {...props} />;
};
Root.displayName = 'RootTable';

type HeaderProps = SlottableViewProps;
type HeaderRef = ViewRef;

const Header = (
  {
    ref,
    asChild,
    ...props
  }: HeaderProps & {
    ref: React.RefObject<HeaderRef>;
  }
) => {
  const Component = asChild ? Slot : View;
  return <Component role='rowheader' ref={ref} {...props} />;
};
Header.displayName = 'HeaderTable';

type RowProps = SlottablePressableProps;
type RowRef = PressableRef;

const Row = (
  {
    ref,
    asChild,
    ...props
  }: RowProps & {
    ref: React.RefObject<RowRef>;
  }
) => {
  const Component = asChild ? Slot : Pressable;
  return <Component ref={ref} role='row' {...props} />;
};
Row.displayName = 'RowTable';

type HeadProps = SlottableViewProps;
type HeadRef = ViewRef;

const Head = (
  {
    ref,
    asChild,
    ...props
  }: HeadProps & {
    ref: React.RefObject<HeadRef>;
  }
) => {
  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='columnheader' {...props} />;
};
Head.displayName = 'HeadTable';

type BodyProps = SlottableViewProps;
type BodyRef = ViewRef;

const Body = (
  {
    ref,
    asChild,
    ...props
  }: BodyProps & {
    ref: React.RefObject<BodyRef>;
  }
) => {
  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='rowgroup' {...props} />;
};
Body.displayName = 'BodyTable';

type CellProps = SlottableViewProps;
type CellRef = ViewRef;

const Cell = (
  {
    ref,
    asChild,
    ...props
  }: CellProps & {
    ref: React.RefObject<CellRef>;
  }
) => {
  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='cell' {...props} />;
};
Cell.displayName = 'CellTable';

type FooterProps = SlottableViewProps;
type FooterRef = ViewRef;

const Footer = (
  {
    ref,
    asChild,
    ...props
  }: FooterProps & {
    ref: React.RefObject<FooterRef>;
  }
) => {
  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='rowgroup' {...props} />;
};
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
