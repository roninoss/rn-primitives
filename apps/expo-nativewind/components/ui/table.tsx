import * as React from 'react';
import * as TablePrimitive from '@rn-primitives/table';
import { cn } from '~/lib/utils';
import { TextClassContext } from '~/components/ui/text';

const Table = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TablePrimitive.Root> & {
  ref?: React.RefObject<React.ElementRef<typeof TablePrimitive.Root>>;
}) => (
  <TablePrimitive.Root
    ref={ref}
    className={cn('w-full caption-bottom text-sm', className)}
    {...props}
  />
);
Table.displayName = 'Table';

const TableHeader = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TablePrimitive.Header> & {
  ref?: React.RefObject<React.ElementRef<typeof TablePrimitive.Header>>;
}) => (
  <TablePrimitive.Header
    ref={ref}
    className={cn('border-border [&_tr]:border-b', className)}
    {...props}
  />
);
TableHeader.displayName = 'TableHeader';

const TableBody = ({
  ref,
  className,
  style,
  ...props
}: React.ComponentPropsWithoutRef<typeof TablePrimitive.Body> & {
  ref?: React.RefObject<React.ElementRef<typeof TablePrimitive.Body>>;
}) => (
  <TablePrimitive.Body
    ref={ref}
    className={cn('flex-1 border-border [&_tr:last-child]:border-0', className)}
    style={[{ minHeight: 2 }, style]}
    {...props}
  />
);
TableBody.displayName = 'TableBody';

const TableFooter = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TablePrimitive.Footer> & {
  ref?: React.RefObject<React.ElementRef<typeof TablePrimitive.Footer>>;
}) => (
  <TablePrimitive.Footer
    ref={ref}
    className={cn('bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
    {...props}
  />
);
TableFooter.displayName = 'TableFooter';

const TableRow = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TablePrimitive.Row> & {
  ref?: React.RefObject<React.ElementRef<typeof TablePrimitive.Row>>;
}) => (
  <TablePrimitive.Row
    ref={ref}
    className={cn(
      'flex-row border-border border-b web:transition-colors web:hover:bg-muted/50 web:data-[state=selected]:bg-muted',
      className
    )}
    {...props}
  />
);
TableRow.displayName = 'TableRow';

const TableHead = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TablePrimitive.Head> & {
  ref?: React.RefObject<React.ElementRef<typeof TablePrimitive.Head>>;
}) => (
  <TextClassContext.Provider value='text-muted-foreground'>
    <TablePrimitive.Head
      ref={ref}
      className={cn(
        'h-12 px-4 text-left justify-center font-medium [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  </TextClassContext.Provider>
);
TableHead.displayName = 'TableHead';

const TableCell = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TablePrimitive.Cell> & {
  ref?: React.RefObject<React.ElementRef<typeof TablePrimitive.Cell>>;
}) => (
  <TablePrimitive.Cell
    ref={ref}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
);
TableCell.displayName = 'TableCell';

export { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow };
