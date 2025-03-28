'use client';
import { Image, Platform, Pressable, View, type PressableRef } from '@rn-primitives/core';
import * as React from 'react';
import { Text } from '~/components/ui/text';
export function Core() {
  const ref = React.useRef<PressableRef>(null);
  return (
    <View>
      <Image src='https://github.com/mrzachnugent.png' className='h-14 w-14 rounded-full' />
      <Pressable ref={ref} onPress={() => alert('Pressed')}>
        <Text>
          {Platform.select({ ios: 'iOS', web: 'Web' })} Pressable with <Text>Nested text</Text>{' '}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          console.log('ref', ref.current);
          ref.current?.press();
        }}
      >
        <Text>Press other Pressable</Text>
      </Pressable>
    </View>
  );
}
