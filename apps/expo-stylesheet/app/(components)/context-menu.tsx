import * as React from 'react';
import { Platform, Pressable, View, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '~/components/ui/context-menu';
import { Text } from '~/components/ui/text';
import { useTheme } from '@react-navigation/native';

export default function ContextScreen() {
  const triggerRef = React.useRef<React.ElementRef<typeof ContextMenuTrigger>>(null);
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [subCheckboxValue, setSubCheckboxValue] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('pedro');

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.topRightButton}
        onPress={() => {
          // Only for Native platforms: open menu programmatically
          triggerRef.current?.open();
        }}
      />
      <ContextMenu>
        <ContextMenuTrigger
          ref={triggerRef}
          style={[styles.contextTrigger, { borderColor: colors.text }]}
        >
          <Text style={[styles.triggerText, { color: colors.text }]}>
            {Platform.OS === 'web' ? 'Right click here' : 'Long press here'}
          </Text>
        </ContextMenuTrigger>

        <ContextMenuContent align='start' insets={contentInsets} style={styles.contextContent}>
          <ContextMenuItem inset>
            <Text>Back</Text>
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            <Text>Forward</Text>
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            <Text>Reload</Text>
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>

          <ContextMenuSub>
            <ContextMenuSubTrigger inset>
              <Text>More Tools</Text>
            </ContextMenuSubTrigger>
            <ContextMenuSubContent style={styles.subContent}>
              <Animated.View entering={FadeIn.duration(200)}>
                <ContextMenuItem>
                  <Text>Save Page As...</Text>
                  <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <Text>Create Shortcut...</Text>
                </ContextMenuItem>

                <ContextMenuSeparator />
                <ContextMenuItem>
                  <Text>Developer Tools</Text>
                </ContextMenuItem>
              </Animated.View>
            </ContextMenuSubContent>
          </ContextMenuSub>

          <ContextMenuSeparator />
          <ContextMenuCheckboxItem
            checked={checkboxValue}
            onCheckedChange={setCheckboxValue}
            closeOnPress={false}
          >
            <Text>Show Bookmarks Bar</Text>
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={subCheckboxValue}
            onCheckedChange={setSubCheckboxValue}
            closeOnPress={false}
          >
            <Text>Show Full URLs</Text>
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value={radioValue} onValueChange={setRadioValue}>
            <ContextMenuLabel inset>People</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuRadioItem value='pedro' closeOnPress={false}>
              <Text>Elmer Fudd</Text>
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value='colm' closeOnPress={false}>
              <Text>Foghorn Leghorn</Text>
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 48,
  },
  topRightButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 64,
    height: 64,
  },
  contextTrigger: {
    height: 150,
    width: '100%',
    maxWidth: 300,
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  triggerText: {
    fontSize: Platform.OS === 'web' ? 14 : 16,
  },
  contextContent: {
    width: Platform.OS === 'web' ? 256 : 288,
  },
  subContent: {
    width: Platform.OS === 'web' ? 192 : 'auto',
    marginTop: Platform.OS === 'web' ? 0 : 4,
  },
});
