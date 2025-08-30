import * as Accordion from '@radix-ui/react-accordion';
import {
  useAugmentedRef,
  useControllableState,
  useIsomorphicLayoutEffect,
} from '@rn-primitives/hooks';
import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import type {
  ContentProps,
  ContentRef,
  HeaderProps,
  HeaderRef,
  ItemProps,
  ItemRef,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
} from './types';

const AccordionContext = React.createContext<RootProps | null>(null);

function Root({ ref, asChild,
      value: valueProp,
      onValueChange: onValueChangeProps,
      defaultValue,
      type,
      disabled,
      dir,
      orientation = 'vertical',
      collapsible,
      ...props
     }: RootProps & { ref?: React.Ref<RootRef> }) {
    const [value = type === 'multiple' ? [] : undefined, onValueChange] = useControllableState<
      (string | undefined) | string[]
    >({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChangeProps as (state: string | string[] | undefined) => void,
    });

    const Component = asChild ? Slot.View : View;
    return (
      <AccordionContext.Provider
        value={
          {
            value,
            onValueChange,
            type,
            disabled,
            dir,
            orientation,
          } as RootProps
        }
      >
        <Accordion.Root
          asChild
          value={value as any}
          onValueChange={onValueChange as any}
          type={type as any}
          disabled={disabled}
          dir={dir}
          orientation={orientation}
          collapsible={collapsible}
        >
          <Component ref={ref} {...props} />
        </Accordion.Root>
      </AccordionContext.Provider>
    );
  }

Root.displayName = 'RootWebAccordion';

function useRootContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'Accordion compound components cannot be rendered outside the Accordion component'
    );
  }
  return context;
}

const AccordionItemContext = React.createContext<(ItemProps & { isExpanded: boolean }) | null>(
  null
);

function Item({ ref, asChild, value: itemValue, disabled, ...props  }: ItemProps & { ref?: React.Ref<ItemRef> }) {
    const augmentedRef = useAugmentedRef({ ref });
    const { value, orientation, disabled: disabledRoot } = useRootContext();

    useIsomorphicLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLDivElement;
        const isExpanded = Array.isArray(value) ? value.includes(itemValue) : value === itemValue;
        augRef.dataset.state = isExpanded ? 'open' : 'closed';
      }
    }, [value, itemValue]);

    useIsomorphicLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLDivElement;
        augRef.dataset.orientation = orientation;
        if (disabled || disabledRoot) {
          augRef.dataset.disabled = 'true';
        } else {
          augRef.dataset.disabled = undefined;
        }
      }
    }, [orientation, disabled, disabledRoot]);

    const Component = asChild ? Slot.View : View;
    return (
      <AccordionItemContext.Provider
        value={{
          value: itemValue,
          disabled,
          isExpanded: isItemExpanded(value, itemValue),
        }}
      >
        <Accordion.Item value={itemValue} disabled={disabled} asChild>
          <Component ref={augmentedRef} {...props} />
        </Accordion.Item>
      </AccordionItemContext.Provider>
    );
  }

Item.displayName = 'ItemWebAccordion';

function useItemContext() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'AccordionItem compound components cannot be rendered outside the AccordionItem component'
    );
  }
  return context;
}

function Header({ ref, asChild, ...props  }: HeaderProps & { ref?: React.Ref<HeaderRef> }) {
  const augmentedRef = useAugmentedRef({ ref });
  const { disabled, isExpanded } = useItemContext();
  const { orientation, disabled: disabledRoot } = useRootContext();

  useIsomorphicLayoutEffect(() => {
    if (augmentedRef.current) {
      const augRef = augmentedRef.current as unknown as HTMLDivElement;
      augRef.dataset.state = isExpanded ? 'open' : 'closed';
    }
  }, [isExpanded]);

  useIsomorphicLayoutEffect(() => {
    if (augmentedRef.current) {
      const augRef = augmentedRef.current as unknown as HTMLDivElement;
      augRef.dataset.orientation = orientation;
      if (disabled || disabledRoot) {
        augRef.dataset.disabled = 'true';
      } else {
        augRef.dataset.disabled = undefined;
      }
    }
  }, [orientation, disabled, disabledRoot]);

  const Component = asChild ? Slot.View : View;
  return (
    <Accordion.Header asChild>
      <Component ref={augmentedRef} {...props} />
    </Accordion.Header>
  );
}

Header.displayName = 'HeaderWebAccordion';

const HIDDEN_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: -999999,
  opacity: 0,
};

function Trigger({ ref, asChild, disabled: disabledProp, ...props  }: TriggerProps & { ref?: React.Ref<TriggerRef> }) {
    const { disabled: disabledRoot } = useRootContext();
    const { disabled, isExpanded } = useItemContext();
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const augmentedRef = useAugmentedRef({ ref });

    useIsomorphicLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLDivElement;

        augRef.dataset.state = isExpanded ? 'expanded' : 'closed';
      }
    }, [isExpanded]);

    useIsomorphicLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLDivElement;

        if (disabled || disabledRoot || disabledProp) {
          augRef.dataset.disabled = 'true';
        } else {
          augRef.dataset.disabled = undefined;
        }
      }
    }, [disabled, disabledRoot, disabledProp]);

    useIsomorphicLayoutEffect(() => {
      if (triggerRef.current) {
        triggerRef.current.disabled = true;
      }
    }, []);

    const isDisabled = disabledProp ?? disabledRoot ?? disabled;
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <>
        <Accordion.Trigger ref={triggerRef} aria-hidden tabIndex={-1} style={HIDDEN_STYLE} />
        <Accordion.Trigger disabled={isDisabled} asChild>
          <Component
            ref={augmentedRef}
            role='button'
            disabled={isDisabled}
            {...props}
            onPress={(ev) => {
              if (triggerRef.current && !isDisabled) {
                triggerRef.current.disabled = false;
                triggerRef.current.click();
                triggerRef.current.disabled = true;
              }
              props.onPress?.(ev);
            }}
          />
        </Accordion.Trigger>
      </>
    );
  }

Trigger.displayName = 'TriggerWebAccordion';

function Content({ ref, asChild, forceMount, ...props  }: ContentProps & { ref?: React.Ref<ContentRef> }) {
    const augmentedRef = useAugmentedRef({ ref });

    const { orientation, disabled: disabledRoot } = useRootContext();
    const { disabled, isExpanded } = useItemContext();
    useIsomorphicLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLDivElement;
        augRef.dataset.state = isExpanded ? 'expanded' : 'closed';
      }
    }, [isExpanded]);

    useIsomorphicLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLDivElement;
        augRef.dataset.orientation = orientation;

        if (disabled || disabledRoot) {
          augRef.dataset.disabled = 'true';
        } else {
          augRef.dataset.disabled = undefined;
        }
      }
    }, [orientation, disabled, disabledRoot]);

    const Component = asChild ? Slot.View : View;
    return (
      <Accordion.Content forceMount={forceMount} asChild>
        <Component ref={augmentedRef} {...props} />
      </Accordion.Content>
    );
  }

Content.displayName = 'ContentWebAccordion';

export { Content, Header, Item, Root, Trigger, useItemContext, useRootContext };

function isItemExpanded(rootValue: string | string[] | undefined, value: string) {
  return Array.isArray(rootValue) ? rootValue.includes(value) : rootValue === value;
}
