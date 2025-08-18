import { useTheme } from '@react-navigation/native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

export default function SelectScreen() {
  const triggerRef = React.useRef<React.ElementRef<typeof SelectTrigger>>(null);
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
          gap: 48,
        }}
      >
        <Pressable
          onPress={() => {
            // open programmatically
            triggerRef.current?.open();
          }}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 64,
            height: 64,
          }}
        />
        <Select defaultValue={{ value: 'apple', label: 'Apple' }}>
          <SelectTrigger ref={triggerRef} style={{ width: 250 }}>
            <SelectValue
              style={{ fontSize: 16, color: colors.text }}
              placeholder='Select a fruit'
            />
          </SelectTrigger>
          <SelectContent insets={contentInsets} style={{ width: 250 }}>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem label='Apple' value='apple'>
                Apple
              </SelectItem>
              <SelectItem label='Banana' value='banana'>
                Banana
              </SelectItem>
              <SelectItem label='Blueberry' value='blueberry'>
                Blueberry
              </SelectItem>
              <SelectItem label='Grapes' value='grapes'>
                Grapes
              </SelectItem>
              <SelectItem label='Pineapple' value='pineapple'>
                Pineapple
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </View>
    </>
  );
}
