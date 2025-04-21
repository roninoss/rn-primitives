import { Core } from '@/components/core';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { View } from '@rn-primitives/core';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
});

export function App() {
  return (
    <div className='py-24 px-4 min-h-svh'>
      <main className='mx-auto max-w-3xl w-full flex flex-col gap-12 '>
        <h1>@rn-primitives</h1>
        <View>
          <p className='font-medium'>Styled with Tailwind</p>
          <Text web={{ as: 'p' }} className='text-sm'>
            No react-native/react-native
          </Text>
        </View>
        <Core />
        <AccordionExample />
        <AspectRatioExample />
        <AvatarExample />
        <CardExample />
        <ButtonExample />
        <CheckboxExample />
        <ProgressExample />
      </main>
    </div>
  );
}

function AccordionExample() {
  return (
    <Accordion type='multiple' collapsible defaultValue={'item-1'}>
      <AccordionItem value='item-1'>
        <AccordionTrigger>
          {({ pressed }) => <Text>Is it accessible? {pressed ? 'pressed' : 'not pressed'}</Text>}
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

function AspectRatioExample() {
  return (
    <View className='flex-1 justify-center items-center'>
      <View className='w-1/2'>
        <AspectRatio ratio={16 / 9}>
          <View className='bg-blue-500 h-full w-full rounded-lg flex justify-center items-center'>
            <Text className='text-white text-2xl font-bold'>16:9</Text>
          </View>
        </AspectRatio>
      </View>
    </View>
  );
}

const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';

function AvatarExample() {
  return (
    <View className='flex-1 justify-center items-center p-6 gap-12'>
      <Avatar alt="Zach Nugent's Avatar">
        <AvatarImage src={GITHUB_AVATAR_URI} />
        <AvatarFallback>
          <Text>ZN</Text>
        </AvatarFallback>
      </Avatar>
    </View>
  );
}

function CardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Card Content</CardDescription>
      </CardContent>
      <CardFooter>
        <Text>Card Footer</Text>
      </CardFooter>
    </Card>
  );
}

function ButtonExample() {
  return (
    <Button>
      <Text>Button</Text>
    </Button>
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
