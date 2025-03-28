'use client';

import * as AccordionPrimitive from '@rn-primitives/accordion';
import { Platform, View } from '@rn-primitives/core';
import {
  FadeIn,
  FadeOutUp,
  LayoutAnimationConfig,
  LinearTransition,
} from '@rn-primitives/core/native-only-reanimated';
import { renderPressableChildren } from '@rn-primitives/utils';
import * as React from 'react';
import { TextClassContext } from '~/components/ui/text';
import { cn } from '~/lib/utils';

const WEB_AS_CHILD_PROPS = { asChild: true };

const ROOT_NATIVE_PROPS = {
  isAnimated: true,
  layout: LinearTransition,
};

const ROOT_INNER_NATIVE_PROPS = {
  isAnimated: true,
  layout: LinearTransition.duration(200),
};

function Accordion({ children, ...props }: AccordionPrimitive.RootProps) {
  return (
    <LayoutAnimationConfig skipEntering>
      <AccordionPrimitive.Root native={ROOT_NATIVE_PROPS} {...props}>
        <View web={WEB_AS_CHILD_PROPS} native={ROOT_INNER_NATIVE_PROPS}>
          <>{children}</>
        </View>
      </AccordionPrimitive.Root>
    </LayoutAnimationConfig>
  );
}

const ITEM_NATIVE_PROPS = {
  isAnimated: true,
  layout: LinearTransition.duration(200),
};

function AccordionItem({ className, value, ...props }: AccordionPrimitive.ItemProps) {
  return (
    <AccordionPrimitive.Item
      className={cn('border-b border-border', className)}
      native={ITEM_NATIVE_PROPS}
      value={value}
      {...props}
    />
  );
}

const AccordionTrigger = ({ className, children, ...props }: AccordionPrimitive.TriggerProps) => {
  const { isExpanded } = AccordionPrimitive.useItemContext();

  return (
    <TextClassContext.Provider value='native:text-lg font-medium'>
      <AccordionPrimitive.Header className='flex'>
        <AccordionPrimitive.Trigger
          className={cn(
            'flex flex-row items-center justify-between py-4',
            Platform.select({
              web: 'flex-1 hover:underline transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-muted-foreground [&[data-state=open]>svg]:rotate-180',
              native: 'active:opacity-50',
            }),
            className
          )}
          {...props}
        >
          {renderPressableChildren(children, (children) => {
            return (
              <>
                {children}
                <View
                  native={{
                    isAnimated: true,
                    style: { transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] },
                  }}
                  web={WEB_AS_CHILD_PROPS}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='lucide lucide-chevron-down size-4 transition-transform'
                  >
                    <path d='m6 9 6 6 6-6' />
                  </svg>
                </View>
              </>
            );
          })}
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    </TextClassContext.Provider>
  );
};

const CONTENT_NATIVE_PROPS = {
  isAnimated: true,
  entering: FadeIn,
  exiting: FadeOutUp.duration(200),
};

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
        <View native={CONTENT_NATIVE_PROPS} className={cn('pb-4', className)}>
          {children}
        </View>
      </AccordionPrimitive.Content>
    </TextClassContext.Provider>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
