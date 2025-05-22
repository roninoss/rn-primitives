import { Platform, Text, View } from '@rn-primitives/core';
import { FadeInDown, LinearTransition } from '@rn-primitives/core/dist/native/reanimated';
import * as React from 'react';
import { Button } from '~/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';
import { ChevronsDownUp } from '~/lib/icons/ChevronsDownUp';
import { ChevronsUpDown } from '~/lib/icons/ChevronsUpDown';
import { cn } from '~/lib/utils';

const NATIVE_ROOT_PROPS = {
  isAnimated: true,
  layout: LinearTransition,
};

export default function CollapsibleScreen() {
  const [open, setOpen] = React.useState(false);
  return (
    <View className='flex-1 justify-center items-center p-6'>
      <Collapsible asChild open={open} onOpenChange={setOpen}>
        <View native={NATIVE_ROOT_PROPS}>
          <View className='w-full max-w-[350px] gap-2'>
            <View className='flex flex-row items-center justify-between space-x-4 px-4'>
              <Text className='text-foreground text-sm native:text-lg font-semibold'>
                @peduarte starred 3 repositories
              </Text>
              <CollapsibleTrigger asChild>
                <Button variant='ghost' size='icon'>
                  {open ? (
                    <ChevronsDownUp size={16} className='text-foreground' />
                  ) : (
                    <ChevronsUpDown size={16} className='text-foreground' />
                  )}
                  <Text className='sr-only'>Toggle</Text>
                </Button>
              </CollapsibleTrigger>
            </View>
            <View className='rounded-md border border-border px-4 py-3 '>
              <Text className='text-foreground text-sm native:text-lg'>@radix-ui/primitives</Text>
            </View>
            <CollapsibleContent
              className={cn(
                'gap-2 overflow-hidden',
                Platform.select({
                  web: 'transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
                })
              )}
            >
              <CollapsibleItem delay={100}>@radix-ui/react</CollapsibleItem>
              <CollapsibleItem delay={200}>@stitches/core</CollapsibleItem>
            </CollapsibleContent>
          </View>
        </View>
      </Collapsible>
    </View>
  );
}

function CollapsibleItem({ children, delay }: { children: string; delay: number }) {
  return (
    <View
      className='rounded-md border border-border px-4 py-3'
      native={{
        isAnimated: true,
        entering: FadeInDown.duration(200).delay(delay),
      }}
    >
      <Text className='text-foreground text-sm native:text-lg'>{children}</Text>
    </View>
  );
}
