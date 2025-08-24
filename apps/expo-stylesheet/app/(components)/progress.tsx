import * as React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button } from '~/components/ui/button';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';

export default function ProgressScreen() {
  const [progress, setProgress] = React.useState(13);

  function onPress() {
    setProgress(Math.floor(Math.random() * 100));
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Progress value={progress} style={styles.progress} />
        <Button variant='ghost' onPress={onPress}>
          <Text>Randomize</Text>
        </Button>
      </View>
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
  inner: {
    width: '100%',
    gap: 32,
    alignItems: 'center',
  },
  progress: {
    width: Platform.OS === 'web' ? '60%' : '100%',
  },
});
