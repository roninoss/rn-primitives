import * as React from 'react';
import { Pressable, View, Text, Platform, StyleSheet, ViewStyle } from 'react-native';
import * as Slider from '@rn-primitives/slider';
import { useTheme } from '@react-navigation/native';
import { type ICustomTheme } from '~/lib/constants';

export default function SliderScreen() {
  const { colors } = useTheme() as ICustomTheme;
  const [value, setValue] = React.useState(50);
  const flattenTrackStyle = StyleSheet.flatten([
    styles.track,
    { backgroundColor: colors.accent, borderColor: colors.border },
  ]);
  const flattenRangeStyle = StyleSheet.flatten([styles.range, { backgroundColor: colors.primary }]);
  const flattenThumbStyle = StyleSheet.flatten([
    styles.thumb,
    { backgroundColor: colors.primary, left: `${value}%` },
  ]);

  return (
    <View style={[styles.container]}>
      <Pressable
        onPress={() => {
          setValue(Math.floor(Math.random() * 100));
        }}
      >
        <Text style={[styles.valueText, { color: colors.text }]}>{Math.round(value)}</Text>
      </Pressable>

      <Slider.Root
        value={value}
        onValueChange={(vals) => {
          const nextValue = vals[0];
          if (typeof nextValue !== 'number') return;
          setValue(nextValue);
        }}
        style={styles.sliderRoot}
      >
        <Slider.Track style={flattenTrackStyle}>
          <View style={{ width: `${value}%`, height: '100%' }}>
            <Slider.Range style={flattenRangeStyle} />
          </View>
          <Slider.Thumb style={flattenThumbStyle as ViewStyle} />
        </Slider.Track>
      </Slider.Root>

      {Platform.OS !== 'web' && (
        <View>
          <Text style={[styles.helperTitle, { color: colors.text }]}>
            You will have to implement the gesture handling
          </Text>
          <Text style={[styles.helperText, { color: colors.text }]}>
            Press the number to change the slider&apos;s value
          </Text>
        </View>
      )}
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
  valueText: {
    fontSize: Platform.OS === 'web' ? 48 : 40,
    lineHeight: Platform.OS === 'web' ? 48 : 40,
    textAlign: 'center',
  },
  sliderRoot: {
    width: '100%',
    justifyContent: 'center',
  },
  track: {
    height: Platform.OS === 'web' ? 16 : 14,
    borderRadius: 9999,
    borderWidth: 1,
  },
  range: {
    height: '100%',
    width: '100%',
    borderRadius: 9999,
  },
  thumb: {
    height: Platform.OS === 'web' ? 40 : 36,
    width: Platform.OS === 'web' ? 40 : 36,
    position: 'absolute',
    transform: [{ translateY: -12 }, { translateX: -20 }],
    borderRadius: 9999,
  },
  helperTitle: {
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 8,
  },
  helperText: {
    textAlign: 'center',
    fontSize: 12,
  },
});
