import { View } from 'react-native';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

export default function LabelScreen() {
  return (
    <View className='flex-row gap-4 w-full p-6 justify-center items-center'>
      <Label
        native={{
          isAnimated: false,
          onPress: () => {
            console.log('onPress');
          },
          onLongPress: () => {
            console.log('onLongPress');
          },
          onPressIn: () => {
            console.log('onPressIn');
          },
          onPressOut: () => {
            console.log('onPressOut');
          },
        }}
      >
        Label
      </Label>
      <Input className='flex-1' />
    </View>
  );
}
