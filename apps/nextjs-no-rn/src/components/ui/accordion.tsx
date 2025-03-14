'use client';

import * as AccordionPrimitive from '@rn-primitives/accordion';
import { renderPressableChildren } from '@rn-primitives/utils';
import * as React from 'react';
import { Platform, View } from '@rn-primitives/core';
// import Animated, {
//   Extrapolation,
//   FadeIn,
//   FadeOutUp,
//   LayoutAnimationConfig,
//   LinearTransition,
//   interpolate,
//   useAnimatedStyle,
//   useDerivedValue,
//   withTiming,
// } from 'react-native-reanimated';
import { TextClassContext } from '~/components/ui/text';
import { cn } from '~/lib/utils';

type AccordionTriggerRef = AccordionPrimitive.TriggerRef;

function Accordion(props: AccordionPrimitive.RootProps) {
  return <AccordionPrimitive.Root {...props} />;
}

function AccordionItem({ className, value, ...props }: AccordionPrimitive.ItemProps) {
  return (
    <AccordionPrimitive.Item
      className={cn('border-b border-border', className)}
      value={value}
      {...props}
    />
  );
}

const AccordionTrigger = React.forwardRef<
  AccordionPrimitive.TriggerRef,
  AccordionPrimitive.TriggerProps
>(({ className, children, ...props }, ref) => {
  return (
    <TextClassContext.Provider value='native:text-lg font-medium'>
      <AccordionPrimitive.Header className='flex'>
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(
            'flex flex-row items-center justify-between py-4',
            Platform.select({
              web: 'flex-1 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-muted-foreground transition-all [&[data-state=open]>svg]:rotate-180',
            }),
            className
          )}
          {...props}
        >
          {renderPressableChildren(children, (children) => {
            return (
              <>
                {children}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='lucide lucide-chevron-down size-4 transition-transform'
                >
                  <path d='m6 9 6 6 6-6' />
                </svg>
              </>
            );
          })}
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    </TextClassContext.Provider>
  );
});

function AccordionContent({ className, children, ...props }: AccordionPrimitive.ContentProps) {
  return (
    <TextClassContext.Provider value='native:text-lg'>
      <AccordionPrimitive.Content
        className={cn(
          'overflow-hidden',
          Platform.select({
            web: 'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
          })
        )}
        {...props}
      >
        <InnerContent className={cn('pb-4', className)}>{children}</InnerContent>
      </AccordionPrimitive.Content>
    </TextClassContext.Provider>
  );
}

function InnerContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <View className={cn('pb-4', className)}>{children}</View>;
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };

export type { AccordionTriggerRef };
