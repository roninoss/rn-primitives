import * as React from 'react';
import * as TablePrimitive from '@rn-primitives/table';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextClassContext } from '~/components/ui/text';
import { type ICustomTheme } from '~/lib/constants';

const Table = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Root>
>(({ style, ...props }, ref) => (
  <TablePrimitive.Root ref={ref} style={[styles.table, style]} {...props} />
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Header>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Header>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme();

  return (
    <TablePrimitive.Header
      ref={ref}
      style={[styles.header, { borderColor: colors.border }, style]}
      {...props}
    />
  );
});
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Body>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Body>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme();

  return (
    <TablePrimitive.Body
      ref={ref}
      style={[styles.body, { borderColor: colors.border }, style]}
      {...props}
    />
  );
});
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Footer>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Footer>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <TablePrimitive.Footer
      ref={ref}
      style={[styles.footer, { backgroundColor: colors.muted }, style]}
      {...props}
    />
  );
});
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Row>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Row> & { style?: StyleProp<ViewStyle> }
>(({ style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <TablePrimitive.Row
      ref={ref}
      style={({ pressed, hovered }) => [
        styles.row,
        { borderColor: colors.borderMedium },
        style,
        pressed && { backgroundColor: colors.accent },
        hovered && { backgroundColor: colors.accent },
      ]}
      {...props}
    />
  );
});
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Head>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Head>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <TextClassContext.Provider value={{ color: colors.mutedText }}>
      <TablePrimitive.Head ref={ref} style={[styles.head, style]} {...props} />
    </TextClassContext.Provider>
  );
});
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  React.ElementRef<typeof TablePrimitive.Cell>,
  React.ComponentPropsWithoutRef<typeof TablePrimitive.Cell>
>(({ style, ...props }, ref) => {
  return <TablePrimitive.Cell ref={ref} style={[styles.cell, style]} {...props} />;
});
TableCell.displayName = 'TableCell';

export { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow };

const styles = StyleSheet.create({
  table: {
    width: '100%',
    fontSize: 14,
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  body: {
    flex: 1,
    minHeight: 2,
  },
  footer: {
    fontWeight: '500',
    borderBottomWidth: 0,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  head: {
    height: 48,
    paddingHorizontal: 16,
    textAlign: 'left',
    justifyContent: 'center',
    fontWeight: '500',
  },
  cell: {
    padding: 16,
    verticalAlign: 'middle',
  },
});
