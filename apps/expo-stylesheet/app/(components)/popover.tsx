import * as React from 'react';
import { Platform, Pressable, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Text } from '~/components/ui/text';
import { useTheme } from '@react-navigation/native';
import { ICustomTheme } from '~/lib/constants';

export default function PopoverScreen() {
  const triggerRef = React.useRef<React.ElementRef<typeof PopoverTrigger>>(null);
  const insets = useSafeAreaInsets();
  const { colors } = useTheme() as ICustomTheme;

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <View style={[styles.container]}>
      <Pressable
        style={({ pressed }) => [
          styles.fab,
          { backgroundColor: pressed ? colors.accent : 'transparent' },
        ]}
        onPress={() => {
          // open programmatically
          triggerRef.current?.open();
        }}
      />
      <Popover>
        <PopoverTrigger ref={triggerRef} asChild>
          <Button variant='outline'>
            <Text>Open popover</Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side={Platform.OS === 'web' ? 'bottom' : 'top'}
          insets={contentInsets}
          style={styles.popoverContent}
        >
          <View style={styles.section}>
            <View style={{ gap: 8 }}>
              <Text style={styles.title}>Dimensions</Text>
              <Text style={[styles.subtitle, { color: colors.mutedText }]}>
                Set the dimensions for the layer.
              </Text>
            </View>
            <View style={styles.inputGroup}>
              <LabelledInput autoFocus id='width' label='Width' />
              <LabelledInput id='maxWidth' label='Max. Width' />
              <LabelledInput id='height' label='Height' />
              <LabelledInput id='maxHeight' label='Max. Height' />
            </View>
          </View>
        </PopoverContent>
      </Popover>
    </View>
  );
}

function LabelledInput({
  id,
  label,
  autoFocus = false,
}: {
  id: string;
  label: string;
  autoFocus?: boolean;
}) {
  const inputRef = React.useRef<React.ElementRef<typeof Input>>(null);

  function onPress() {
    inputRef.current?.focus();
  }

  return (
    <View style={styles.labelledInputRow}>
      <Label nativeID={id} onPress={onPress} style={styles.label}>
        {label}
      </Label>
      <Input
        ref={inputRef}
        autoFocus={autoFocus}
        aria-labelledby={id}
        defaultValue='25px'
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  fab: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 64,
    height: 64,
  },
  popoverContent: {
    width: 320,
  },
  section: {
    gap: 16,
  },
  title: {
    fontWeight: '500',
    fontSize: Platform.OS === 'web' ? 16 : 18,
    lineHeight: Platform.OS === 'web' ? 20 : 28,
  },
  subtitle: {
    fontSize: Platform.OS === 'web' ? 14 : 12,
  },
  inputGroup: {
    gap: 8,
  },
  labelledInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Platform.OS === 'web' ? 8 : 16,
  },
  label: {
    width: 96,
  },
  input: {
    flex: 1,
    height: Platform.OS === 'web' ? 32 : 40,
  },
});
