import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function Home() {
  return (
    <main className='flex flex-col gap-12 justify-center items-center py-24 px-4'>
      <Avatar alt='Unstyled Avatar' className='w-24 h-24 bg-red-500'>
        <AvatarImage />
        <AvatarFallback className='bg-blue-500'>
          {/* NOTE: Text is from React Native so class names work but Avatar components do not */}
          <Text>@rn-p</Text>
        </AvatarFallback>
      </Avatar>
      <Button>
        <Text>React Native Pressable + Text</Text>
      </Button>
    </main>
  );
}
