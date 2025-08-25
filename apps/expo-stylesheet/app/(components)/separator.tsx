import { View, StyleSheet } from 'react-native';
import { Separator } from '~/components/ui/separator';
import { H4, P, Small } from '~/components/ui/typography';
import { useTheme } from '@react-navigation/native';
import { type ICustomTheme } from '~/lib/constants';

export default function SeparatorScreen() {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <H4 style={styles.headerTitle}>Radix Primitives</H4>
          <P style={[styles.headerDescription, { color: colors.mutedText }]}>
            An open-source UI component library.
          </P>
        </View>
        <Separator style={styles.separatorMargin} />
        <View style={styles.row}>
          <Small style={styles.smallText}>Blog</Small>
          <Separator orientation='vertical' />
          <Small style={styles.smallText}>Docs</Small>
          <Separator orientation='vertical' />
          <Small style={styles.smallText}>Source</Small>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 48,
    gap: 48,
  },
  card: {
    width: '100%',
    maxWidth: 320,
  },
  header: {
    gap: 4,
  },
  headerTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
  headerDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  separatorMargin: {
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
    gap: 16,
  },
  smallText: {
    fontSize: 12,
    fontWeight: 400,
  },
});
