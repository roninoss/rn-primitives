'use client';
import { Text, Pressable, View, Image, Platform, type PressableRef } from '@rn-primitives/core';
import * as React from 'react';

export function Core() {
  const ref = React.useRef<PressableRef>(null);
  return (
    <View>
      <Image src='https://github.com/mrzachnugent.png' className='h-14 w-14 rounded-full' />
      <Pressable ref={ref} role='button' onPress={() => alert('Pressed')}>
        <Text role='paragraph'>{Platform.select({ ios: 'iOS', web: 'Web' })} Pressable</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          console.log('ref', ref.current);
          ref.current?.press?.();
        }}
      >
        <Text>Press other Pressable</Text>
      </Pressable>
    </View>
  );
}
