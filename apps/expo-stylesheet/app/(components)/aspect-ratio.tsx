import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { H1 } from '~/components/ui/typography';

export default function AspectRatioScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <AspectRatio ratio={16 / 9}>
          <View style={[styles.innerBox]}>
            <H1 style={{ color: '#fff' }}>16:9</H1>
          </View>
        </AspectRatio>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: '50%',
  },
  innerBox: {
    backgroundColor: '#3b82f6',
    height: '100%',
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
