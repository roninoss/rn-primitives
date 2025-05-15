'use client';

import * as React from 'react';
import { View } from 'react-native';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';

// TODO(zach): fix all inputs that need aria-labelledby and id to be the same. Just use id.

export function CheckboxExample() {
  const [checked, setChecked] = React.useState(false);
  return (
    <View className='flex-row gap-3 items-center'>
      <Checkbox web={{ id: 'terms' }} checked={checked} onCheckedChange={setChecked} />
      <Label for='terms'>Accept terms and conditions</Label>
    </View>
  );
}
