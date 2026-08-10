import * as Toolbar from '@rn-primitives/toolbar';
import * as React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { AlignCenter, AlignLeft, Bold, Italic } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { type ICustomTheme } from '~/lib/constants';

export default function ToolbarScreen() {
  const [singleValue, setSingleValue] = React.useState<string>();
  const [multipleValue, setMultipleValue] = React.useState<string[]>([]);
  const { colors } = useTheme() as ICustomTheme;
  const flattenToolbarRootStyle = StyleSheet.flatten([
    styles.toolbarRoot,
    { borderColor: colors.border },
  ]);
  const nativeToolbarButtonStyle = ({ pressed }: { pressed: boolean }) => [
    styles.button,
    {
      backgroundColor: pressed ? colors.accent : colors.buttonSecondary,
    },
  ];
  const webToolbarButtonStyle = {
    ...styles.button,
    backgroundColor: colors.buttonSecondary,
  };

  return (
    <View style={styles.container}>
      <Toolbar.Root style={flattenToolbarRootStyle}>
        {/* Bold & Italic Group */}
        <Toolbar.ToggleGroup
          type='multiple'
          value={multipleValue}
          onValueChange={setMultipleValue}
          style={styles.group}
        >
          <Toolbar.ToggleItem
            value='bold'
            style={StyleSheet.flatten([
              styles.item,
              {
                backgroundColor: multipleValue.includes('bold') ? colors.accent : 'transparent',
              },
            ])}
          >
            <Bold color={colors.text} />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            value='italic'
            style={StyleSheet.flatten([
              styles.item,
              {
                backgroundColor: multipleValue.includes('italic') ? colors.accent : 'transparent',
              },
            ])}
          >
            <Italic color={colors.text} />
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>

        <Toolbar.Separator style={[styles.separator, { backgroundColor: colors.border }]} />

        {/* Align Group */}
        <Toolbar.ToggleGroup
          type='single'
          value={singleValue}
          onValueChange={setSingleValue}
          style={styles.group}
        >
          <Toolbar.ToggleItem
            value='left'
            style={StyleSheet.flatten([
              styles.item,
              {
                backgroundColor: singleValue === 'left' ? colors.accent : 'transparent',
              },
            ])}
          >
            <AlignLeft color={colors.text} />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            value='center'
            style={StyleSheet.flatten([
              styles.item,
              {
                backgroundColor: singleValue === 'center' ? colors.accent : 'transparent',
              },
            ])}
          >
            <AlignCenter color={colors.text} />
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>

        <Toolbar.Separator style={[styles.separator, { backgroundColor: colors.border }]} />

        {/* Button aligned right */}
        <View style={styles.flexEnd}>
          <Toolbar.Button
            onPress={() => console.log('Button pressed')}
            style={Platform.OS === 'web' ? webToolbarButtonStyle : nativeToolbarButtonStyle}
          >
            <Text style={[styles.buttonText, { color: colors.text }]}>Button</Text>
          </Toolbar.Button>
        </View>
      </Toolbar.Root>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 48,
  },
  toolbarRoot: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
  },
  group: {
    flexDirection: 'row',
    gap: 4,
  },
  item: {
    padding: 8,
    borderRadius: 8,
  },
  separator: {
    height: '100%',
    width: 2,
  },
  flexEnd: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
  },
});
