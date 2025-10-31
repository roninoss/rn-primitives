import { Stack } from 'expo-router';
import * as React from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  View,
  useWindowDimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '~/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Text } from '~/components/ui/text';
import { ChevronDown } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { type ICustomTheme } from '~/lib/constants';

const MIN_COLUMN_WIDTHS = [120, 120, 110, 120];

export default function TableScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isMediumOrAboveScreen = width >= 768;
  const { colors } = useTheme() as ICustomTheme;

  const columnWidths = React.useMemo(() => {
    return MIN_COLUMN_WIDTHS.map((minWidth) => {
      const evenWidth = width / MIN_COLUMN_WIDTHS.length;
      return evenWidth > minWidth ? evenWidth : minWidth;
    });
  }, [width]);

  return (
    <>
      <Stack.Screen options={{ headerShadowVisible: false }} />
      <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
        <Table aria-labelledby='invoice-table'>
          <TableHeader>
            <TableRow>
              {/* Invoice with popover */}
              <TableHead style={{ paddingHorizontal: 2, width: columnWidths[0] }}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant='ghost' size='sm' style={styles.popoverButton}>
                      <Text style={[styles.invoiceText, { color: colors.mutedText }]}>Invoice</Text>
                      <ChevronDown color={colors.mutedText} size={18} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    style={{ padding: 18, width: isMediumOrAboveScreen ? 290 : 260 }}
                    insets={{ left: 6 }}
                  >
                    <View style={{ gap: 6 }}>
                      <Text style={styles.popoverTitle}>Table Head</Text>
                      <Text style={[styles.popoverDescription, { color: colors.mutedText }]}>
                        This is the Invoice column. Just an example of a popover.
                      </Text>
                    </View>
                  </PopoverContent>
                </Popover>
              </TableHead>

              {/* Other table heads */}
              <TableHead style={{ width: columnWidths[1] }}>
                <Text>Status</Text>
              </TableHead>
              <TableHead style={{ width: columnWidths[2] }}>
                <Text>Method</Text>
              </TableHead>
              <TableHead style={{ width: columnWidths[3] }}>
                <Text
                  style={isMediumOrAboveScreen ? styles.amountHeadWeb : styles.amountHeadNative}
                >
                  Amount
                </Text>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <FlatList
              data={INVOICES}
              contentContainerStyle={{ paddingBottom: insets.bottom }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: invoice, index }) => {
                return (
                  <TableRow
                    key={invoice.invoice}
                    style={[index % 2 !== 0 && { backgroundColor: colors.accentMild }]}
                  >
                    <TableCell style={{ width: columnWidths[0] }}>
                      <Text>{invoice.invoice}</Text>
                    </TableCell>
                    <TableCell style={{ width: columnWidths[1] }}>
                      <Text>{invoice.paymentStatus}</Text>
                    </TableCell>
                    <TableCell style={{ width: columnWidths[2] }}>
                      <Text>{invoice.paymentMethod}</Text>
                    </TableCell>
                    <TableCell style={{ width: columnWidths[3], alignItems: 'flex-end' }}>
                      <Button
                        variant='secondary'
                        size='sm'
                        style={[styles.priceButton]}
                        onPress={() => {
                          Alert.alert(
                            invoice.totalAmount,
                            `You pressed the price button on invoice ${invoice.invoice}.`
                          );
                        }}
                      >
                        <Text>{invoice.totalAmount}</Text>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }}
              ListFooterComponent={() => {
                return (
                  <>
                    <TableFooter>
                      <TableRow>
                        <TableCell style={styles.tableFooterCell}>
                          <Text>Total</Text>
                        </TableCell>
                        <TableCell style={styles.tableFooterCellAmount}>
                          <Button
                            size='sm'
                            variant='ghost'
                            onPress={() => {
                              Alert.alert(
                                'Total Amount',
                                `You pressed the total amount price button.`
                              );
                            }}
                          >
                            <Text>$2,500.00</Text>
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                    <View style={styles.footerNote}>
                      <Text
                        nativeID='invoice-table'
                        style={[styles.footerNoteText, { color: colors.mutedText }]}
                      >
                        A list of your recent invoices.
                      </Text>
                    </View>
                  </>
                );
              }}
            />
          </TableBody>
        </Table>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  popoverButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 12,
  },
  invoiceText: {
    fontSize: Platform.OS === 'web' ? 16 : 14,
    fontWeight: '500',
  },
  popoverTitle: {
    fontSize: Platform.OS === 'web' ? 24 : 22,
    lineHeight: Platform.OS === 'web' ? 32 : 28,
    fontWeight: '700',
  },
  popoverDescription: {
    fontSize: Platform.OS === 'web' ? 18 : 16,
    lineHeight: Platform.OS === 'web' ? 28 : 24,
  },
  amountHeadNative: {
    textAlign: 'center',
  },
  amountHeadWeb: {
    textAlign: 'right',
    paddingRight: 20,
  },
  priceButton: {
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginRight: 12,
    paddingHorizontal: 8,
  },
  tableFooterCell: {
    flex: 1,
    justifyContent: 'center',
  },
  tableFooterCellAmount: {
    alignItems: 'flex-end',
    paddingRight: 24,
  },
  footerNote: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  footerNoteText: {
    textAlign: 'center',
    fontSize: Platform.OS === 'web' ? 14 : 12,
  },
});

const INVOICES = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  { invoice: 'INV002', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  { invoice: 'INV005', paymentStatus: 'Paid', totalAmount: '$550.00', paymentMethod: 'PayPal' },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV008',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  { invoice: 'INV009', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
  {
    invoice: 'INV0010',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV0011',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  { invoice: 'INV0012', paymentStatus: 'Paid', totalAmount: '$550.00', paymentMethod: 'PayPal' },
  {
    invoice: 'INV0013',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV0014',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV0015',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  { invoice: 'INV0016', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
  {
    invoice: 'INV0017',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV0018',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  { invoice: 'INV0019', paymentStatus: 'Paid', totalAmount: '$550.00', paymentMethod: 'PayPal' },
  {
    invoice: 'INV0020',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV0021',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
];
