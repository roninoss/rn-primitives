import { Link } from 'expo-router';
import * as React from 'react';
import { FlatList, Pressable, View, Text } from 'react-native';
import { ChevronRight } from '~/lib/icons/ChevronRight';

export default function ComponentsScreen() {
  const ref = React.useRef(null);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={ref}
        data={COMPONENTS}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Link href={`/${item}`} asChild>
            <Pressable
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                paddingLeft: 16,
                paddingRight: 6,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 12,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 16 }}>{toOptions(item)}</Text>
              <ChevronRight color={'rgba(0,0,0,0.5)'} />
            </Pressable>
          </Link>
        )}
        ListFooterComponent={<View style={{ paddingVertical: 4 * 4 }} />}
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
  // 'accordion',
  // 'alert-dialog',
  // 'aspect-ratio',
  // 'avatar',
  // 'checkbox',
  // 'collapsible',
  // 'context-menu',
  // 'dialog',
  // 'dropdown-menu',
  // 'hover-card',
  // 'menubar',
  // 'navigation-menu',
  // 'popover',
  // 'progress',
  // 'radio-group',
  'select',
  // 'separator',
  // 'slider',
  // 'switch',
  // 'table',
  // 'tabs',
  // 'toggle',
  // 'toggle-group',
  // 'toolbar',
  // 'tooltip',
] as const;
