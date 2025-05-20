'use client';

import * as React from 'react';
import { Switch } from './ui/switch';
import { View } from 'react-native';
import { Label } from './ui/label';

export function SwitchExample() {
  const [checked, setChecked] = React.useState(false);

  return (
    <View className='flex-row items-center gap-2'>
      <Switch checked={checked} onCheckedChange={setChecked} id='airplane-mode' />
      <Label
        for='airplane-mode'
        native={{
          onPress: () => {
            setChecked((prev) => !prev);
          },
        }}
      >
        Airplane Mode
      </Label>
    </View>
  );
}
