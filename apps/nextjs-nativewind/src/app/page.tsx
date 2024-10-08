import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function Home() {
  return (
    <main className='flex flex-col gap-12 justify-center py-24 px-4'>
      <div className='border border-dashed border-red-500 rounded-xl p-12 flex flex-col items-center max-w-xl mx-auto w-full'>
        <Avatar alt='Unstyled Avatar' className='w-24 h-24 bg-red-500'>
          <AvatarImage />
          <AvatarFallback className='bg-blue-500'>
            {/* NOTE: Text is from React Native so class names work but Avatar components do not */}
            <Text>RNP</Text>
          </AvatarFallback>
        </Avatar>
        <div className='p-2' />
        <Text className='text-center'>@rn-primitives/avatar</Text>
      </div>
      <div className='border border-dashed border-emerald-500 rounded-xl p-12 flex flex-col items-center max-w-xl mx-auto w-full'>
        <Button>
          <Text>RNR Button</Text>
        </Button>
        <div className='p-2' />
        <Text className='text-center'>Pressable + Text</Text>
      </div>
    </main>
  );
}
