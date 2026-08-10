import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';

export default function RadioGroupScreen() {
  const [value, setValue] = React.useState('Comfortable');

  function onLabelPress(label: string) {
    return () => {
      setValue(label);
    };
  }

  return (
    <View style={styles.container}>
      <RadioGroup value={value} onValueChange={setValue} style={styles.group}>
        <RadioGroupItemWithLabel value='Default' onLabelPress={onLabelPress('Default')} />
        <RadioGroupItemWithLabel value='Comfortable' onLabelPress={onLabelPress('Comfortable')} />
        <RadioGroupItemWithLabel value='Compact' onLabelPress={onLabelPress('Compact')} />
      </RadioGroup>
    </View>
  );
}

function RadioGroupItemWithLabel({
  value,
  onLabelPress,
}: {
  value: string;
  onLabelPress: () => void;
}) {
  return (
    <View style={styles.itemWithLabel}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <Label nativeID={`label-for-${value}`} onPress={onLabelPress}>
        {value}
      </Label>
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
  group: {
    gap: 12,
  },
  itemWithLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
