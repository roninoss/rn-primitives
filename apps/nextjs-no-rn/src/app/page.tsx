import { Text } from '~/components/ui/text';
import { View } from '@rn-primitives/core';
import { Core } from '~/components/core';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
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
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Button } from '~/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Checkbox } from '~/components/ui/checkbox';
import { Progress } from '~/components/ui/progress';
import { Separator } from '~/components/ui/separator';
import { Toggle } from '~/components/ui/toggle';
import { ToggleGroup } from '~/components/ui/toggle-group';

export default function Home() {
  return (
    <div className='py-24 px-4 min-h-svh'>
      <main className='mx-auto max-w-3xl w-full flex flex-col gap-12 '>
        <h1>@rn-primitives</h1>
        <View>
          <p className='font-medium'>Styled with Tailwind</p>
          <Text className='text-sm'>No react-native/react-native</Text>
        </View>
        <Core />
        <AccordionExample />
        <AlertDialogExample />
        <AspectRatioExample />
        <AvatarExample />
        <CheckboxExample />
        <ProgressExample />
        <SeparatorExample />
        <ToggleExample />
        <ToggleGroupExample />
      </main>
    </div>
  );
}

function AccordionExample() {
  return (
    <Accordion type='multiple' collapsible defaultValue={'item-1'}>
      <AccordionItem value='item-1'>
        <AccordionTrigger>
          {/* {
            // Need "use client" to use Pressable function children with state
            ({ pressed }) => <Text>Is it accessible? {pressed ? 'pressed' : 'not pressed'}</Text>
          } */}
          <Text>Is it accessible?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>
          <Text>What are universal components?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>
            In the world of React Native, universal components are components that work on both web
            and native platforms.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>
          <Text>Is this component universal?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>Yes. Try it out on the web, iOS, and/or Android.</Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function AlertDialogExample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline' className='mx-auto'>
          <Text>Show Alert Dialog</Text>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
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
  );
}

function AspectRatioExample() {
  return (
    <AspectRatio ratio={16 / 9}>
      <View className='bg-blue-500 h-full w-full rounded-lg flex flex-col gap-2 justify-center items-center'>
        <Text className='text-white text-7xl font-bold'>16 / 9</Text>
        <Text className='text-white text-sm'>Aspect-ratio</Text>
      </View>
    </AspectRatio>
  );
}

const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';
function AvatarExample() {
  return (
    <Avatar alt="Zach Nugent's Avatar">
      <AvatarImage src={GITHUB_AVATAR_URI} />
      <AvatarFallback>
        <Text>ZN</Text>
      </AvatarFallback>
    </Avatar>
  );
}

function CheckboxExample() {
  return (
    <View className='flex flex-row gap-3 items-center'>
      <Checkbox web={{ id: 'checkbox' }} aria-labelledby='terms' />
      <label htmlFor='checkbox'>Accept terms and conditions</label>
    </View>
  );
}

function ProgressExample() {
  return <Progress value={50} />;
}

function SeparatorExample() {
  return (
    <View className='flex flex-col gap-3'>
      <Text>RN Primitive Separator</Text>
      <Separator orientation='horizontal' />
      <View className='flex flex-row gap-3 h-5 items-center'>
        <Text>Blog</Text>
        <Separator orientation='vertical' />
        <Text>Docs</Text>
        <Separator orientation='vertical' />
        <Text>Source</Text>
      </View>
    </View>
  );
}

function ToggleExample() {
  return (
    <View className='flex-1 justify-center items-center'>
      <Toggle variant='outline' />
    </View>
  );
}

function ToggleGroupExample() {
  return <ToggleGroup type='multiple' variant='outline' />;
}
