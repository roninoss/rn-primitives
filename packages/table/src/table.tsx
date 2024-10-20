import * as Slot from '@rn-primitives/slot';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rn-primitives/types';
import * as React from 'react';
import { Pressable, View } from 'react-native';

type TableRootProps = SlottableViewProps;

const Root = React.forwardRef<ViewRef, TableRootProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component role='table' ref={ref} {...props} />;
});
Root.displayName = 'RootTable';

type TableHeaderProps = SlottableViewProps;

const Header = React.forwardRef<ViewRef, TableHeaderProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component role='rowheader' ref={ref} {...props} />;
});
Header.displayName = 'HeaderTable';

type TableRowProps = SlottablePressableProps;

const Row = React.forwardRef<PressableRef, TableRowProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return <Component ref={ref} role='row' {...props} />;
});
Row.displayName = 'RowTable';

type TableHeadProps = SlottableViewProps;

const Head = React.forwardRef<ViewRef, TableHeadProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='columnheader' {...props} />;
});
Head.displayName = 'HeadTable';

type TableBodyProps = SlottableViewProps;

const Body = React.forwardRef<ViewRef, TableBodyProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='rowgroup' {...props} />;
});
Body.displayName = 'BodyTable';

type TableCellProps = SlottableViewProps;

const Cell = React.forwardRef<ViewRef, TableCellProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='cell' {...props} />;
});
Cell.displayName = 'CellTable';

type TableFooterProps = SlottableViewProps;

const Footer = React.forwardRef<ViewRef, TableFooterProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='rowgroup' {...props} />;
});
Footer.displayName = 'FooterTable';

export { Body, Cell, Footer, Head, Header, Root, Row };
export type {
  TableBodyProps,
  TableCellProps,
  TableFooterProps,
  TableHeaderProps,
  TableHeadProps,
  TableRootProps,
  TableRowProps,
};
