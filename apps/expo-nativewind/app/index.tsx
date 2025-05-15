import { Link } from 'expo-router';
import * as React from 'react';
import { FlatList, View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { ChevronRight } from '~/lib/icons/ChevronRight';
import { cn } from '~/lib/utils';

export default function ComponentsScreen() {
  const [search, setSearch] = React.useState('');
  const ref = React.useRef(null);

  const data = !search
    ? COMPONENTS
    : COMPONENTS.filter((item) => item.toLowerCase().includes(search.toLowerCase()));
  return (
    <View className='flex-1 px-4'>
      <View className='py-4'>
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
        className='native:overflow-hidden rounded-t-lg'
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Link href={`/${item}`} asChild>
            <Button
              variant='secondary'
              size='lg'
              className={cn(
                'bg-secondary/40 pl-4 pr-1.5 border-x border-t border-foreground/5 rounded-none flex-row justify-between',
                index === 0 && 'rounded-t-lg',
                index === data.length - 1 && 'border-b rounded-b-lg'
              )}
            >
              <Text className='text-xl'>{toOptions(item)}</Text>
              <ChevronRight className='text-foreground/50' />
            </Button>
          </Link>
        )}
        ListFooterComponent={<View className='py-4' />}
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
  'label',
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
