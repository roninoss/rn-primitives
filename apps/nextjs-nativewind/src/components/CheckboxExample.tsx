'use client';

import * as React from 'react';
import { View } from 'react-native';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';

export function CheckboxExample() {
  const [checked, setChecked] = React.useState(false);
  return (
    <View className='flex-row gap-3 items-center'>
      <Checkbox id='terms' checked={checked} onCheckedChange={setChecked} />
      <Label htmlFor='terms'>Accept terms and conditions</Label>
    </View>
  );
}
