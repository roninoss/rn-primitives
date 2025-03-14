import * as AccordionPrimitive from '@rn-primitives/accordion';
import { Platform, View } from '@rn-primitives/core';
import {
  FadeIn,
  FadeOutUp,
  LayoutAnimationConfig,
  LinearTransition,
} from '@rn-primitives/core/dist/native/reanimated';
import { renderPressableChildren } from '@rn-primitives/utils';
import * as React from 'react';
import { TextClassContext } from '~/components/ui/text';
import { ChevronDown } from '~/lib/icons/ChevronDown';
import { cn } from '~/lib/utils';

type AccordionTriggerRef = AccordionPrimitive.TriggerRef;

const WEB_AS_CHILD = { asChild: true };

const NATIVE_ROOT = {
  isAnimated: true,
  layout: LinearTransition,
};

const INNER_NATIVE = {
  isAnimated: true,
  layout: Platform.select({ native: LinearTransition.duration(200) }),
};

function Accordion({ children, ...props }: AccordionPrimitive.RootProps) {
  return (
    <LayoutAnimationConfig skipEntering>
      <AccordionPrimitive.Root native={NATIVE_ROOT} {...props}>
        <View web={WEB_AS_CHILD} native={INNER_NATIVE}>
          <>{children}</>
        </View>
      </AccordionPrimitive.Root>
    </LayoutAnimationConfig>
  );
}

function AccordionItem({ className, value, ...props }: AccordionPrimitive.ItemProps) {
  return (
    <AccordionPrimitive.Item
      className={cn('border-b border-border', className)}
      native={{ isAnimated: true, layout: LinearTransition.duration(200) }}
      value={value}
      {...props}
    />
  );
}

const AccordionTrigger = React.forwardRef<
  AccordionPrimitive.TriggerRef,
  AccordionPrimitive.TriggerProps
>(({ className, children, ...props }, ref) => {
  const { isExpanded } = AccordionPrimitive.useItemContext();

  return (
    <TextClassContext.Provider value='native:text-lg font-medium'>
      <AccordionPrimitive.Header className='flex'>
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(
            'flex flex-row items-center justify-between py-4',
            Platform.select({
              web: 'flex-1 hover:underline transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-muted-foreground [&[data-state=open]>svg]:rotate-180',
            }),
            className
          )}
          {...props}
        >
          {renderPressableChildren(children, (children, state) => {
            return (
              <>
                {children}
                <View
                  native={{
                    isAnimated: true,
                    style: { transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] },
                  }}
                  web={WEB_AS_CHILD}
                >
                  <ChevronDown
                    size={18}
                    className={cn(
                      'text-foreground shrink-0',
                      Platform.select({ web: 'transition-transform duration-200' }),
                      state?.pressed && 'opacity-50'
                    )}
                  />
                </View>
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
        <View
          native={{ isAnimated: true, entering: FadeIn, exiting: FadeOutUp.duration(200) }}
          className={cn('pb-4', className)}
        >
          {children}
        </View>
      </AccordionPrimitive.Content>
    </TextClassContext.Provider>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };

export type { AccordionTriggerRef };
