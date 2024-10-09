'use client';

import * as React from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { View } from 'react-native';
import { Label } from './ui/label';

export function RadioGroupExample() {
  const [value, setValue] = React.useState('Comfortable');

  function onLabelPress(label: string) {
    return () => {
      setValue(label);
    };
  }
  return (
    <RadioGroup value={value} onValueChange={setValue} className='gap-3'>
      <RadioGroupItemWithLabel value='Default' onLabelPress={onLabelPress('Default')} />
      <RadioGroupItemWithLabel value='Comfortable' onLabelPress={onLabelPress('Comfortable')} />
      <RadioGroupItemWithLabel value='Compact' onLabelPress={onLabelPress('Compact')} />
    </RadioGroup>
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
    <View className={'flex-row gap-2 items-center'}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <Label nativeID={`label-for-${value}`} onPress={onLabelPress}>
        {value}
      </Label>
    </View>
  );
}
