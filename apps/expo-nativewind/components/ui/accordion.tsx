import * as AccordionPrimitive from '@rn-primitives/accordion-new';
import * as React from 'react';
import { Platform, PressableProps, PressableStateCallbackType, View } from 'react-native';
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOutUp,
  LayoutAnimationConfig,
  LinearTransition,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { TextClassContext } from '~/components/ui/text';
import { ChevronDown } from '~/lib/icons/ChevronDown';
import { cn } from '~/lib/utils';
import { Slot } from '@rn-primitives/slot';

type AccordionTriggerRef = AccordionPrimitive.TriggerRef;

function Accordion({ children, ...props }: AccordionPrimitive.RootProps) {
  const Inner = Platform.OS === 'web' ? Slot : Animated.View;
  return (
    <LayoutAnimationConfig skipEntering>
      <AccordionPrimitive.Root
        native={{
          isAnimated: true,
          layout: LinearTransition.duration(200),
        }}
        {...props}
      >
        <Inner layout={Platform.select({ native: LinearTransition.duration(200) })}>
          <>{children}</>
        </Inner>
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

  const progress = useDerivedValue(
    () => (isExpanded ? withTiming(1, { duration: 250 }) : withTiming(0, { duration: 200 })),
    [isExpanded]
  );
  const chevronStyle = useAnimatedStyle(
    () => ({
      transform: [{ rotate: `${progress.value * 180}deg` }],
      opacity: interpolate(progress.value, [0, 1], [1, 0.8], Extrapolation.CLAMP),
    }),
    [progress]
  );

  const IconWrapper = Platform.OS === 'web' ? Slot : Animated.View;
  return (
    <TextClassContext.Provider value='native:text-lg font-medium web:group-hover:underline'>
      <AccordionPrimitive.Header className='flex'>
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(
            'flex flex-row web:flex-1 items-center justify-between py-4 web:transition-all group web:focus-visible:outline-none web:focus-visible:ring-1 web:focus-visible:ring-muted-foreground',
            Platform.select({ web: '[&[data-state=open]>svg]:rotate-180' }),
            className
          )}
          {...props}
        >
          {renderPressableChildren(children, (children) => {
            return (
              <>
                {children}
                <IconWrapper style={Platform.select({ native: chevronStyle })}>
                  <ChevronDown
                    size={18}
                    className={cn(
                      'text-foreground shrink-0',
                      Platform.select({ web: 'transition-transform duration-200' })
                    )}
                  />
                </IconWrapper>
              </>
            );
          })}
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    </TextClassContext.Provider>
  );
});

// TODO: move this to nr-primitives
function renderPressableChildren(
  children: PressableProps['children'],
  render: (children: React.ReactNode) => React.ReactNode
) {
  return typeof children === 'function'
    ? (state: PressableStateCallbackType) => render(children(state))
    : render(children);
}

function AccordionContent({ className, children, ...props }: AccordionPrimitive.ContentProps) {
  return (
    <TextClassContext.Provider value='native:text-lg'>
      <AccordionPrimitive.Content
        className='overflow-hidden text-sm'
        web={{
          className:
            'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
        }}
        {...props}
      >
        <InnerContent className={cn('pb-4', className)}>{children}</InnerContent>
      </AccordionPrimitive.Content>
    </TextClassContext.Provider>
  );
}

function InnerContent({ children, className }: { children: React.ReactNode; className?: string }) {
  if (Platform.OS === 'web') {
    return <View className={cn('pb-4', className)}>{children}</View>;
  }
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOutUp.duration(200)}
      className={cn('pb-4', className)}
    >
      {children}
    </Animated.View>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };

export type { AccordionTriggerRef };
