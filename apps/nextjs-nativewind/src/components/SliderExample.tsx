'use client';

import * as React from 'react';
import { Pressable, View, Text } from 'react-native';
import * as Slider from '@rn-primitives/slider';
import { cn } from '~/lib/utils';

export function SliderExample() {
  const [value, setValue] = React.useState(50);

  return (
    <>
      <View className='flex-1 justify-center items-center p-6 gap-12'>
        <Pressable
          onPress={() => {
            setValue(Math.floor(Math.random() * 100));
          }}
        >
          <Text className='text-5xl text-center text-foreground'>{Math.round(value)}</Text>
        </Pressable>
        <Slider.Root
          value={value}
          onValueChange={(vals) => {
            const nextValue = vals[0];
            if (typeof nextValue !== 'number') return;
            setValue(nextValue);
          }}
          className='w-full justify-center'
        >
          <Slider.Track className='h-4 bg-secondary rounded-full border border-border'>
            <Slider.Range
              style={{ width: `${value + (value < 50 ? 2 : 0)}%` }}
              className='bg-primary h-full rounded-full'
            />
            <Slider.Thumb
              style={{ left: `${value}%` }}
              className={cn(
                'h-10 w-10 bg-primary absolute -translate-y-3 -translate-x-1/2  rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
              )}
            />
          </Slider.Track>
        </Slider.Root>
      </View>
    </>
  );
}
