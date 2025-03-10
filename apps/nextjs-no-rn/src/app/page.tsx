import { Text, View } from '@rn-primitives/core';
import { Core } from '~/components/core';

export default function Home() {
  return (
    <div className='py-24 px-4 min-h-svh'>
      <main className='mx-auto max-w-3xl w-full flex flex-col gap-12 '>
        <h1>@rn-primitives</h1>
        <View>
          <p className='font-medium'>Styled with Tailwind</p>
          <Text role='paragraph' className='text-sm'>
            No react-native/react-native
          </Text>
        </View>
        <Core />
      </main>
    </div>
  );
}
