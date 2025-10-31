import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Label } from '~/components/ui/label';
import { Switch } from '~/components/ui/switch';

export default function SwitchScreen() {
  const [checked, setChecked] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Switch checked={checked} onCheckedChange={setChecked} nativeID='airplane-mode' />
        <Label nativeID='airplane-mode' onPress={() => setChecked((prev) => !prev)}>
          Airplane Mode
        </Label>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
