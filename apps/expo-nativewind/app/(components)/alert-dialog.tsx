import { PressableRef } from '@rn-primitives/core';
import * as React from 'react';
import { View } from 'react-native';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function AlertDialogScreen() {
  const ref = React.useRef<PressableRef>(null);
  return (
    <View className='flex-1 justify-center items-center'>
      <Button
        className='absolute top-4 right-4'
        onPress={() => {
          ref.current?.press();
        }}
      >
        <Text>Press Trigger</Text>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button ref={ref} variant='outline'>
            {(state) => <Text>Show Alert Dialog - state: {state.pressed.toString()}</Text>}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Text>Cancel</Text>
            </AlertDialogCancel>
            <AlertDialogAction>
              <Text>Continue</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
}
