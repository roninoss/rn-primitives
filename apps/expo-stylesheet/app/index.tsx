import { Link } from 'expo-router';
import * as React from 'react';
import { FlatList, View, StyleSheet, Platform } from 'react-native';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { type ICustomTheme } from '~/lib/constants';

export default function ComponentsScreen() {
  const [search, setSearch] = React.useState('');
  const ref = React.useRef(null);
  const { colors } = useTheme() as ICustomTheme;

  const data = !search
    ? COMPONENTS
    : COMPONENTS.filter((item) => item.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <Input
          placeholder='Search UI...'
          clearButtonMode='always'
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        ref={ref}
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <Link href={`/${item}`} asChild>
            <Button
              variant='secondary'
              size='lg'
              style={[
                styles.button,
                { borderColor: colors.border, backgroundColor: colors.accentMild },
                index === 0 && styles.firstButton,
                index === data.length - 1 && styles.lastButton,
              ]}
            >
              <Text style={styles.buttonText}>{toOptions(item)}</Text>
              <ChevronRight color={colors.mutedText} />
            </Button>
          </Link>
        )}
        ListFooterComponent={<View style={styles.footerSpacing} />}
      />
    </View>
  );
}

function toOptions(name: string) {
  const title = name
    .split('-')
    .map(function (str: string) {
      return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
      });
    })
    .join(' ');
  return title;
}

const COMPONENTS = [
  'accordion',
  'alert-dialog',
  'aspect-ratio',
  'avatar',
  'checkbox',
  'collapsible',
  'context-menu',
  'dialog',
  'dropdown-menu',
  'hover-card',
  'menubar',
  'navigation-menu',
  'popover',
  'progress',
  'radio-group',
  'select',
  'separator',
  'slider',
  'switch',
  'table',
  'tabs',
  'toggle',
  'toggle-group',
  'toolbar',
  'tooltip',
] as const;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchWrapper: {
    paddingVertical: 12,
  },
  listContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  button: {
    paddingLeft: 16,
    paddingRight: 6,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderRadius: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firstButton: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  lastButton: {
    borderBottomWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  buttonText: {
    fontSize: Platform.OS === 'web' ? 20 : 16,
  },
  footerSpacing: {
    paddingVertical: 16,
  },
});
