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
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({ asChild, ref, ...props }: RootComponentProps) => {
  const Component = asChild ? Slot : View;
  return <Component role='table' ref={ref} {...props} />;
};
Root.displayName = 'RootTable';

type HeaderProps = SlottableViewProps;
type HeaderRef = ViewRef;
type HeaderComponentProps = HeaderProps & React.RefAttributes<HeaderRef>;

const Header = ({ asChild, ref, ...props }: HeaderComponentProps) => {
  const Component = asChild ? Slot : View;
  return <Component role='rowheader' ref={ref} {...props} />;
};
Header.displayName = 'HeaderTable';

type RowProps = SlottablePressableProps;
type RowRef = PressableRef;
type RowComponentProps = RowProps & React.RefAttributes<RowRef>;

const Row = ({ asChild, ref, ...props }: RowComponentProps) => {
  const Component = asChild ? Slot : Pressable;
  return <Component ref={ref} role='row' {...props} />;
};
Row.displayName = 'RowTable';

type HeadProps = SlottableViewProps;
type HeadRef = ViewRef;
type HeadComponentProps = HeadProps & React.RefAttributes<HeadRef>;

const Head = ({ asChild, ref, ...props }: HeadComponentProps) => {
  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='columnheader' {...props} />;
};
Head.displayName = 'HeadTable';

type BodyProps = SlottableViewProps;
type BodyRef = ViewRef;
type BodyComponentProps = BodyProps & React.RefAttributes<BodyRef>;

const Body = ({ asChild, ref, ...props }: BodyComponentProps) => {
  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='rowgroup' {...props} />;
};
Body.displayName = 'BodyTable';

type CellProps = SlottableViewProps;
type CellRef = ViewRef;
type CellComponentProps = CellProps & React.RefAttributes<CellRef>;

const Cell = ({ asChild, ref, ...props }: CellComponentProps) => {
  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='cell' {...props} />;
};
Cell.displayName = 'CellTable';

type FooterProps = SlottableViewProps;
type FooterRef = ViewRef;
type FooterComponentProps = FooterProps & React.RefAttributes<FooterRef>;

const Footer = ({ asChild, ref, ...props }: FooterComponentProps) => {
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
