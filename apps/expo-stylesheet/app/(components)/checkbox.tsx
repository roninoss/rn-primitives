import * as React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';

export default function CheckboxScreen() {
  const [checked, setChecked] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Checkbox
          id='checkbox'
          aria-labelledby='terms'
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Label
          nativeID='terms'
          onPress={Platform.select({ web: undefined, default: () => setChecked((prev) => !prev) })}
          htmlFor='checkbox'
        >
          Accept terms and conditions
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
    gap: 12,
    alignItems: 'center',
  },
});
