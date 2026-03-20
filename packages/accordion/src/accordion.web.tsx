import * as Accordion from '@radix-ui/react-accordion';
import {
  useComposedRefs,
  useControllableState,
  useIsomorphicLayoutEffect,
} from '@rn-primitives/hooks';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
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
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  value: valueProp,
  onValueChange: onValueChangeProps,
  defaultValue,
  type,
  disabled,
  dir,
  orientation = 'vertical',
  collapsible,
  ref,
  ...props
}: RootComponentProps) => {
  const [value = type === 'multiple' ? [] : undefined, onValueChange] = useControllableState<
    (string | undefined) | string[]
  >({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChangeProps as (state: string | string[] | undefined) => void,
  });

  const Component = asChild ? Slot : View;
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
};

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
type ItemComponentProps = ItemProps & React.RefAttributes<ItemRef>;

const Item = ({ asChild, value: itemValue, disabled, ref, ...props }: ItemComponentProps) => {
  const itemRef = React.useRef<ItemRef>(null);
  const composedRef = useComposedRefs(ref, itemRef);
  const { value, orientation, disabled: disabledRoot } = useRootContext();

  useIsomorphicLayoutEffect(() => {
    if (itemRef.current) {
      const augRef = itemRef.current as unknown as HTMLDivElement;
      const isExpanded = Array.isArray(value) ? value.includes(itemValue) : value === itemValue;
      augRef.dataset.state = isExpanded ? 'open' : 'closed';
    }
  }, [value, itemValue]);

  useIsomorphicLayoutEffect(() => {
    if (itemRef.current) {
      const augRef = itemRef.current as unknown as HTMLDivElement;
      augRef.dataset.orientation = orientation;
      if (disabled || disabledRoot) {
        augRef.dataset.disabled = 'true';
      } else {
        augRef.dataset.disabled = undefined;
      }
    }
  }, [orientation, disabled, disabledRoot]);

  const Component = asChild ? Slot : View;
  return (
    <AccordionItemContext.Provider
      value={{
        value: itemValue,
        disabled,
        isExpanded: isItemExpanded(value, itemValue),
      }}
    >
      <Accordion.Item value={itemValue} disabled={disabled} asChild>
        <Component ref={composedRef} {...props} />
      </Accordion.Item>
    </AccordionItemContext.Provider>
  );
};

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
type HeaderComponentProps = HeaderProps & React.RefAttributes<HeaderRef>;

const Header = ({ asChild, ref, ...props }: HeaderComponentProps) => {
  const headerRef = React.useRef<HeaderRef>(null);
  const composedRef = useComposedRefs(ref, headerRef);
  const { disabled, isExpanded } = useItemContext();
  const { orientation, disabled: disabledRoot } = useRootContext();

  useIsomorphicLayoutEffect(() => {
    if (headerRef.current) {
      const augRef = headerRef.current as unknown as HTMLDivElement;
      augRef.dataset.state = isExpanded ? 'open' : 'closed';
    }
  }, [isExpanded]);

  useIsomorphicLayoutEffect(() => {
    if (headerRef.current) {
      const augRef = headerRef.current as unknown as HTMLDivElement;
      augRef.dataset.orientation = orientation;
      if (disabled || disabledRoot) {
        augRef.dataset.disabled = 'true';
      } else {
        augRef.dataset.disabled = undefined;
      }
    }
  }, [orientation, disabled, disabledRoot]);

  const Component = asChild ? Slot : View;
  return (
    <Accordion.Header asChild>
      <Component ref={composedRef} {...props} />
    </Accordion.Header>
  );
};

Header.displayName = 'HeaderWebAccordion';

const HIDDEN_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: -999999,
  opacity: 0,
};
type TriggerComponentProps = TriggerProps & React.RefAttributes<TriggerRef>;

const Trigger = ({ asChild, disabled: disabledProp, ref, ...props }: TriggerComponentProps) => {
  const { disabled: disabledRoot } = useRootContext();
  const { disabled, isExpanded } = useItemContext();
  const hiddenTriggerRef = React.useRef<HTMLButtonElement>(null);
  const triggerRef = React.useRef<TriggerRef>(null);
  const composedRef = useComposedRefs(ref, triggerRef);

  useIsomorphicLayoutEffect(() => {
    if (triggerRef.current) {
      const augRef = triggerRef.current as unknown as HTMLDivElement;

      augRef.dataset.state = isExpanded ? 'expanded' : 'closed';
    }
  }, [isExpanded]);

  useIsomorphicLayoutEffect(() => {
    if (triggerRef.current) {
      const augRef = triggerRef.current as unknown as HTMLDivElement;

      if (disabled || disabledRoot || disabledProp) {
        augRef.dataset.disabled = 'true';
      } else {
        augRef.dataset.disabled = undefined;
      }
    }
  }, [disabled, disabledRoot, disabledProp]);

  useIsomorphicLayoutEffect(() => {
    if (hiddenTriggerRef.current) {
      hiddenTriggerRef.current.disabled = true;
    }
  }, []);

  const isDisabled = disabledProp ?? disabledRoot ?? disabled;
  const Component = asChild ? Slot : Pressable;
  return (
    <>
      <Accordion.Trigger ref={hiddenTriggerRef} aria-hidden tabIndex={-1} style={HIDDEN_STYLE} />
      <Accordion.Trigger disabled={isDisabled} asChild>
        <Component
          ref={composedRef}
          role='button'
          disabled={isDisabled}
          {...props}
          onPress={(ev: GestureResponderEvent) => {
            if (hiddenTriggerRef.current && !isDisabled) {
              hiddenTriggerRef.current.disabled = false;
              hiddenTriggerRef.current.click();
              hiddenTriggerRef.current.disabled = true;
            }
            props.onPress?.(ev);
          }}
        />
      </Accordion.Trigger>
    </>
  );
};

Trigger.displayName = 'TriggerWebAccordion';
type ContentComponentProps = ContentProps & React.RefAttributes<ContentRef>;

const Content = ({ asChild, forceMount, ref, ...props }: ContentComponentProps) => {
  const contentRef = React.useRef<ContentRef>(null);
  const composedRef = useComposedRefs(ref, contentRef);

  const { orientation, disabled: disabledRoot } = useRootContext();
  const { disabled, isExpanded } = useItemContext();
  useIsomorphicLayoutEffect(() => {
    if (contentRef.current) {
      const augRef = contentRef.current as unknown as HTMLDivElement;
      augRef.dataset.state = isExpanded ? 'expanded' : 'closed';
    }
  }, [isExpanded]);

  useIsomorphicLayoutEffect(() => {
    if (contentRef.current) {
      const augRef = contentRef.current as unknown as HTMLDivElement;
      augRef.dataset.orientation = orientation;

      if (disabled || disabledRoot) {
        augRef.dataset.disabled = 'true';
      } else {
        augRef.dataset.disabled = undefined;
      }
    }
  }, [orientation, disabled, disabledRoot]);

  const Component = asChild ? Slot : View;
  return (
    <Accordion.Content forceMount={forceMount} asChild>
      <Component ref={composedRef} {...props} />
    </Accordion.Content>
  );
};

Content.displayName = 'ContentWebAccordion';

export { Content, Header, Item, Root, Trigger, useItemContext, useRootContext };

function isItemExpanded(rootValue: string | string[] | undefined, value: string) {
  return Array.isArray(rootValue) ? rootValue.includes(value) : rootValue === value;
}
