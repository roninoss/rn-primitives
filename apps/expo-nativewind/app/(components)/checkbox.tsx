import * as React from 'react';
import { Platform, View } from 'react-native';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';

export default function CheckboxScreen() {
  const [checked, setChecked] = React.useState(false);
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <View className='flex-row gap-3 items-center'>
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
