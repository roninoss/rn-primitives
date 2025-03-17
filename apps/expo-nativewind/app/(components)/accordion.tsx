import { Pressable, View } from '@rn-primitives/core';
import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function AccordionScreen() {
  const ref = React.useRef<React.ComponentRef<typeof AccordionTrigger>>(null);
  return (
    <View className='flex-1 justify-between items-center px-6 pb-safe'>
      <Accordion
        type='multiple'
        collapsible
        defaultValue={['item-1']}
        className='w-full max-w-sm native:max-w-md'
      >
        <AccordionItem value='item-1'>
          <AccordionTrigger ref={ref}>
            {(state) => <Text>Show Alert Dialog - state: {state.pressed.toString()}</Text>}
          </AccordionTrigger>
          <AccordionContent>
            <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <Pressable asChild>
            <AccordionTrigger>
              <Text>What are universal components?</Text>
            </AccordionTrigger>
          </Pressable>
          <AccordionContent>
            <Text>
              In the world of React Native, universal components are components that work on both
              web and native platforms.
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
      <Button
        onPress={() => {
          ref.current?.press();
        }}
      >
        <Text>Trigger Item 1</Text>
      </Button>
    </View>
  );
}
