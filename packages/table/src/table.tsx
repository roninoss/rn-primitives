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

const Root = React.forwardRef<RootRef, RootProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component role='table' ref={ref} {...props} />;
});
Root.displayName = 'RootTable';

type HeaderProps = SlottableViewProps;
type HeaderRef = ViewRef;

const Header = React.forwardRef<HeaderRef, HeaderProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component role='rowheader' ref={ref} {...props} />;
});
Header.displayName = 'HeaderTable';

type RowProps = SlottablePressableProps;
type RowRef = PressableRef;

const Row = React.forwardRef<RowRef, RowProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return <Component ref={ref} role='row' {...props} />;
});
Row.displayName = 'RowTable';

type HeadProps = SlottableViewProps;
type HeadRef = ViewRef;

const Head = React.forwardRef<HeadRef, HeadProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='columnheader' {...props} />;
});
Head.displayName = 'HeadTable';

type BodyProps = SlottableViewProps;
type BodyRef = ViewRef;

const Body = React.forwardRef<BodyRef, BodyProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='rowgroup' {...props} />;
});
Body.displayName = 'BodyTable';

type CellProps = SlottableViewProps;
type CellRef = ViewRef;

const Cell = React.forwardRef<CellRef, CellProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='cell' {...props} />;
});
Cell.displayName = 'CellTable';

type FooterProps = SlottableViewProps;
type FooterRef = ViewRef;

const Footer = React.forwardRef<FooterRef, FooterProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='rowgroup' {...props} />;
});
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
