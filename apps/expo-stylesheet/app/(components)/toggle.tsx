import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Toggle, ToggleIcon } from '~/components/ui/toggle';
import { Bold } from 'lucide-react-native';

export default function ToggleUniversalcreen() {
  const [pressed, setPressed] = React.useState(false);
  return (
    <View style={styles.container}>
      <Toggle
        pressed={pressed}
        onPressedChange={setPressed}
        aria-label='Toggle bold'
        variant='outline'
      >
        <ToggleIcon icon={Bold} size={18} />
      </Toggle>
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
});
